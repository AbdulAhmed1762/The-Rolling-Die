require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

// Define the slash commands
const commands = [

    new SlashCommandBuilder()
        .setName("stock")
        .setDescription("Check the stock of a board game")
        .addStringOption(option =>
            option.setName("title")
                .setDescription("Name of the board game")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName("price")
        .setDescription("Check the price of a board game")
        .addStringOption(option =>
            option.setName("title")
                .setDescription("Name of the board game")
                .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName("game")
        .setDescription("View information about a board game")
        .addStringOption(option =>
            option.setName("title")
                .setDescription("Name of the board game")
                .setRequired(true)
        )

].map(command => command.toJSON());

// Connect to Discord API
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// Register commands in the Discord server
async function registerCommands() {

    try {

        console.log("Registering Discord slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.DISCORD_CLIENT_ID,
                process.env.DISCORD_GUILD_ID
            ),
            { body: commands }
        );

        console.log("Discord slash commands registered successfully!");

    } catch (err) {
        console.error("Error registering commands:", err);
    }
}

registerCommands();