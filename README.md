# The Rolling Die

## Project Overview

The Rolling Die is a board game inventory management website with Discord bot integration.

Customers can browse available board games, while managers can log in to add, edit, and delete games from the inventory.

The application also includes a Discord bot that allows users to check game prices, stock availability, and game information. Discord command activity is displayed in real time on the manager dashboard using Socket.IO.

## Technologies Used

- Node.js and Express.js
- Mustache templates
- SQLite database
- Discord.js
- Socket.IO
- HTML, CSS, and JavaScript

## Installation

1. Install Node.js.
2. Extract the project ZIP file.
3. Open the project folder in VS Code.
4. Open a terminal in the project directory.
5. Install the required dependencies:

    npm install

## Environment Configuration

Create a `.env` file in the project root with the following variables:

    SESSION_SECRET=your_random_session_secret
    MANAGER_USERNAME=your_manager_username
    MANAGER_PASSWORD=your_manager_password
    DISCORD_TOKEN=your_discord_bot_token
    DISCORD_CLIENT_ID=your_discord_application_id
    DISCORD_GUILD_ID=your_discord_server_id

Keep the `.env` file private.

## Database Setup

Initialize the SQLite database:

    node database/initDatabase.js

Create the manager account:

    node database/createManager.js

Optionally, insert sample games:

    node database/seedDatabase.js

## Discord Bot Setup

1. Open the Discord Developer Portal.
2. Select or create a Discord application.
3. Configure the bot and install it in a Discord server with the `bot` and `applications.commands` scopes.
4. Add the Discord token, Application ID, and Server ID to `.env`.
5. Register the slash commands:

    node bot/registerCommands.js

### Available Slash Commands

- `/stock title:<game>` — Checks the available stock.
- `/price title:<game>` — Retrieves the game's price.
- `/game title:<game>` — Displays game information.

All commands retrieve current data from the SQLite database.

## Running the Application

Start the Express website and Discord bot together:

    node app.js

Open the following pages:

- Public Inventory: http://localhost:3000/inventory
- Manager Login: http://localhost:3000/login
- Manager Dashboard: http://localhost:3000/manager/dashboard

The manager dashboard requires authentication.

## Main Features

- Public board game inventory
- Manager login and logout
- Add, edit, and delete board games
- Persistent SQLite inventory
- Three Discord slash commands
- Real-time Discord activity using Socket.IO

## Project Structure

- `app.js` — Main Express server and Socket.IO configuration
- `bot/` — Discord bot and slash command registration
- `controllers/` — Application request handling
- `database/` — SQLite setup and initialization
- `middleware/` — Authentication middleware
- `models/` — Database queries
- `public/` — CSS and frontend JavaScript
- `routes/` — Express routes
- `views/` — Mustache templates
