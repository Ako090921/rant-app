const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files (e.g., your frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file at the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Function to save form submissions as .txt files
const saveSubmission = (nickname, rant) => {
  const folderPath = path.join(__dirname, 'submissions');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const fileName = `${nickname}-${Date.now()}.txt`;
  const filePath = path.join(folderPath, fileName);

  const submissionText = `Nickname: ${nickname}\nRant: ${rant}`;
  fs.writeFileSync(filePath, submissionText);
};

// Route to handle form submission
app.post('/submit', async (req, res) => {
  const { nickname, rant } = req.body;

  if (!nickname || !rant) {
    return res.status(400).json({ message: 'Nickname and rant are required!' });
  }

  try {
    saveSubmission(nickname, rant);
    res.json({ message: 'Thank you for your submission!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving submission!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
