# 📝 Real-Time Collaborative Editor

A lightweight, web-based **Real-Time Collaboration Tool** that allows multiple users to edit documents simultaneously. Built using **Node.js**, **WebSockets**, **MongoDB**, and **Quill.js**, this project mimics Google Docs-style collaboration with rich-text formatting support and database persistence.

---

## 🚀 Features

- 🔄 Real-time syncing between multiple users using WebSocket
- 🖊️ Rich text editing via **Quill.js** (bold, italic, font size, etc.)
- 🖼️ Image import and resizable support
- 💾 Save document contents to **MongoDB**
- 📥 Download document as `.html`
- 🔁 Loads last saved version automatically on refresh
- 📤 Auto-sync with database when changes are made

---


---

## 🛠️ Tech Stack

| Frontend     | Backend     | Real-Time      | Database     |
|--------------|-------------|----------------|--------------|
| HTML, CSS, JS | Node.js     | WebSocket (ws) | MongoDB      |
| Quill.js      | Express.js  |                | Mongoose ODM |

---

## 📦 How to Run Locally

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/dnyandevzagade/REAL-TIME-COLLABORATION-TOOL.git
cd REAL-TIME-COLLABORATION-TOOL


## 📦 How to Run Locally

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/dnyandevzagade/REAL-TIME-COLLABORATION-TOOL.git
cd REAL-TIME-COLLABORATION-TOOL

Install Dependencies -
npm install

--------
Configure MongoDB -
Create a .env file and add your MongoDB connection string like:
.env
MONGO_URL=mongodb://localhost:27017/realtime-editor

-------
Run the Server -
node server.js

--------
Go to your browser and visit:
http://localhost:3000
