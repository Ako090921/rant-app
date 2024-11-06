const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' folder (images, styles)
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'jscripts' folder (scripts)
app.use('/jscripts', express.static(path.join(__dirname, 'jscripts')));

// Serve your index.html from the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve submission folder (optional, if you need to view the submissions directly from the browser)
app.use('/submissions', express.static(path.join(__dirname, 'submissions')));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
