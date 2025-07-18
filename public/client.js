const socket = new WebSocket('ws://localhost:3000');
const status = document.getElementById('status');
const typingIndicator = document.getElementById('typing-indicator');
const toggleDarkMode = document.getElementById('toggleDarkMode');
const downloadBtn = document.getElementById('downloadBtn');

// Initialize Quill with image resize
const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: '#toolbar-container'
  }
});


// ---- WebSocket Events ----

socket.onmessage = async (event) => {
  const data = JSON.parse(event.data instanceof Blob ? await event.data.text() : event.data);

  switch (data.type) {
    case 'init':
      quill.setContents(JSON.parse(data.content));
      break;

    case 'update':
      const current = quill.getContents();
      const incoming = JSON.parse(data.content);
      if (JSON.stringify(current) !== JSON.stringify(incoming)) {
        quill.setContents(incoming);
      }
      break;

    case 'typing':
      typingIndicator.style.display = 'block';
      clearTimeout(window.typingTimeout);
      window.typingTimeout = setTimeout(() => {
        typingIndicator.style.display = 'none';
      }, 1500);
      break;
  }
};

socket.onopen = () => status.textContent = "🟢 Connected!";
socket.onerror = () => status.textContent = "⚠️ Connection error!";
socket.onclose = () => status.textContent = "🔴 Disconnected";

// ---- Send Content with Debounce ----

let timeout;
quill.on('text-change', () => {
  clearTimeout(timeout);

  // Notify others you're typing
  socket.send(JSON.stringify({ type: 'typing' }));

  // Debounced content save
  timeout = setTimeout(() => {
    const content = JSON.stringify(quill.getContents());
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: 'content',
        content
      }));
      status.textContent = "✅ All changes saved";
    }
  }, 300);
});

// ---- Dark Mode Toggle ----

toggleDarkMode.addEventListener('change', () => {
  const editorContainer = document.getElementById('editor-container');
  if (toggleDarkMode.checked) {
    document.body.style.background = '#121212';
    editorContainer.style.background = '#1e1e1e';
    editorContainer.style.color = '#e0e0e0';
  } else {
    document.body.style.background = '#f1f3f4';
    editorContainer.style.background = '#ffffff';
    editorContainer.style.color = '#000000';
  }
});

// ---- Download as .html ----

downloadBtn.addEventListener('click', () => {
  const html = quill.root.innerHTML;
  const blob = new Blob([html], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'document.html';
  link.click();
});
