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
SCREENSHOTS - 

<img width="1479" height="757" alt="Screenshot 2025-07-18 171906" src="https://github.com/user-attachments/assets/5ce0fb2a-9bdf-4c73-be95-cef6db4e6f68" />
<img width="1916" height="1199" alt="Screenshot 2025-07-18 171924" src="https://github.com/user-attachments/assets/da401920-dce9-492c-a2ef-32b40b36390d" />


## 📚 Internship Details

This project was developed as part of the **Task 3** during my internship at **CODTECH**.  
Intern Name: **Dnyandev Rama Zagade**  
Internship Duration: *Summer Internship 2025*  
Project Title: *Real-Time Collaborative Editor Tool*


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




