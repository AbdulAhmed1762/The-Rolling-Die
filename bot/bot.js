
require("dotenv").config();

const { Client, GatewayIntentBits, Events } = require("discord.js");
const gameModel = require("../models/gameModel.js");

// Create Discord bot client
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Bot is connected
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Discord bot logged in as ${readyClient.user.tag}`);
});

// Start the Discord bot and connect it to Socket.IO
function startBot(io) {

    // Handle slash commands
    client.on(Events.InteractionCreate, async (interaction) => {

        if (!interaction.isChatInputCommand()) {
            return;
        }

        const command = interaction.commandName;

        if (!["stock", "price", "game"].includes(command)) {
            return;
        }

        const title = interaction.options.getString("title", true).trim();

        try {

            // Acknowledge the command while SQLite is queried
            await interaction.deferReply();

            gameModel.getGameByTitle(title, async (err, game) => {

                try {

                    if (err) {
                        console.error("Database error:", err.message);

                        await interaction.editReply(
                            "Unable to retrieve game information."
                        );

                    } else if (!game) {

                        await interaction.editReply(
                            `Game "${title}" was not found.`
                        );

                    } else if (command === "stock") {

                        await interaction.editReply(
                            `${game.title} has ${game.stock} copies in stock.`
                        );

                    } else if (command === "price") {

                        await interaction.editReply(
                            `${game.title} costs $${Number(game.price).toFixed(2)}.`
                        );

                    } else if (command === "game") {

                        await interaction.editReply(
                            `**${game.title}**\n` +
                            `Category: ${game.category}\n` +
                            `Description: ${game.description}\n` +
                            `Price: $${Number(game.price).toFixed(2)}\n` +
                            `Stock: ${game.stock}`
                        );
                    }

                    // Send Discord activity to logged-in managers
                    io.to("managers").emit("discordActivity", {
                        command: command,
                        game: title,
                        user: interaction.user.username,
                        time: new Date().toLocaleTimeString()
                    });

                    console.log(
                        `Discord activity: /${command} ${title} by ${interaction.user.username}`
                    );

                } catch (error) {
                    console.error("Discord response error:", error);
                }
            });

        } catch (error) {
            console.error("Discord command error:", error);
        }
    });

    // Log in to Discord
    client.login(process.env.DISCORD_TOKEN).catch((err) => {
        console.error("Discord login error:", err);
    });
}

module.exports = { startBot };
