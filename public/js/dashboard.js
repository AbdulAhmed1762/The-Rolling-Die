
// Connect to Socket.IO server
const socket = io();

const activityList = document.getElementById("discord-activity");
const socketStatus = document.getElementById("socket-status");

// Socket.IO connected
socket.on("connect", () => {
    socketStatus.textContent = "Connected - Listening for Discord activity";
    socketStatus.style.color = "green";
});

// Socket.IO disconnected
socket.on("disconnect", () => {
    socketStatus.textContent = "Disconnected from live activity";
    socketStatus.style.color = "red";
});

// Receive Discord activity from the server
socket.on("discordActivity", (activity) => {

    // Remove the default message
    const noActivity = document.getElementById("no-activity");

    if (noActivity) {
        noActivity.remove();
    }

    // Create a new activity item
    const activityItem = document.createElement("li");

    activityItem.textContent =
        `${activity.time} - ${activity.user} used /${activity.command} for ${activity.game}`;

    // Add newest activity to the top
    activityList.prepend(activityItem);

    // Keep only the 10 most recent activities
    while (activityList.children.length > 10) {
        activityList.removeChild(activityList.lastElementChild);
    }
});
