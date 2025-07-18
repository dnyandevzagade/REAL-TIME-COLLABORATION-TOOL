require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const { MongoClient } = require('mongodb');

// Setup
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(express.static('public'));

const uri = process.env.MONGODB_URI || "mongodb+srv://username:password@cluster0.mongodb.net/editorDB?retryWrites=true&w=majority";
let db;

// Track connected clients
const clients = new Map();

async function connectDB() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 30000
  });

  try {
    await client.connect();
    console.log("✅ MongoDB Connected!");
    return client.db("editorDB");
  } catch (err) {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  }
}

wss.on('connection', async (ws) => {
  const userColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
  const userId = Date.now().toString(36);
  clients.set(ws, { userId, userColor });

  console.log(`🔵 User ${userId} connected`);

  // Load initial content
  try {
    const doc = await db.collection('documents').findOne({ docId: 'main' });
    if (doc) {
      ws.send(JSON.stringify({
        type: 'init',
        content: doc.content,
        color: userColor
      }));
    }
  } catch (err) {
    console.error('❌ Load error:', err);
  }

  // Handle incoming messages
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'content') {
        // Save Quill Delta content to DB
        await db.collection('documents').updateOne(
          { docId: 'main' },
          { $set: { content: data.content, lastUpdated: new Date() } },
          { upsert: true }
        );

        // Broadcast update to others
        for (const [client, meta] of clients) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'update',
              content: data.content
            }));
          }
        }
      }

      if (data.type === 'typing') {
        // Broadcast typing status to others
        for (const [client, meta] of clients) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'typing' }));
          }
        }
      }

    } catch (err) {
      console.error('❌ Message error:', err);
    }
  });

  // Handle disconnect
  ws.on('close', () => {
    console.log(`🔴 User ${userId} disconnected`);
    clients.delete(ws);
  });
});

// Start server
(async () => {
  db = await connectDB();
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})();
