const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast =  (data, ws) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

wss.numberOfOnlineUsers = 0;

wss.on('connection', (ws) => {

  wss.numberOfOnlineUsers++;
  const numberOfOnlineUsers = {
    type: "numberOfOnlineUsers",
    content: wss.numberOfOnlineUsers
  };
  wss.broadcast(JSON.stringify(numberOfOnlineUsers), ws);

  console.log('Client connected');
  ws.on('message',  (message) => {
    const newMessage = JSON.parse(message);
    switch (newMessage.type) {
      case "postMessage":
        newMessage.id = uuid();
        newMessage.type = "incomingMessage";
        wss.broadcast(JSON.stringify(newMessage) ,ws);
        break;
      case "postNotification":
        const newNotification = {
          type: "incomingNotification",
          content: newMessage.content
        };
        wss.broadcast(JSON.stringify(newNotification), ws);
        break;
      default:
        throw new Error("Unknown Type: " + newMessage.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

    wss.numberOfOnlineUsers--;
    const numberOfOnlineUsers = {
      type: "numberOfOnlineUsers",
      content: wss.numberOfOnlineUsers
    };
    wss.broadcast(JSON.stringify(numberOfOnlineUsers), ws);

    console.log('Client disconnected')
  });
});