const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const updatedUsrCount = () => {
  const currentUserCount = wss.clients.size
  return {
    type: "userCount",
    count: currentUserCount
  }
}

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  const countMessage = updatedUsrCount();

  wss.broadcast(JSON.stringify(countMessage));
    ws.on('message', (message) => {
      const recievedMsg = JSON.parse(message);
      recievedMsg.id = uuidv1();
      if(recievedMsg.type === "postMessage") {
        recievedMsg.type = "incomingMessage"
      wss.broadcast(JSON.stringify(recievedMsg));
    }
      if(recievedMsg.type === "postNotification") {
        recievedMsg.type = "incomingNotification"
      wss.broadcast(JSON.stringify(recievedMsg));
    }
      
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    const countMessage = updatedUsrCount();
    wss.broadcast(JSON.stringify(countMessage));
    console.log('Client disconnected')
  })
});