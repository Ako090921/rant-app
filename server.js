const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for cross-origin requests
app.use(cors());

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files like images from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Function to save data to a text file
const saveToFile = async (data) => {
  const folderPath = path.join(__dirname, 'submission'); // Updated folder for storing submissions
  const fileName = `${data.nickname}.txt`; // Filename based on the nickname
  const filePath = path.join(folderPath, fileName);

  try {
    // Ensure the submissions folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Write the rant data into a file named after the nickname
    const content = `Nickname: ${data.nickname}\nRant: ${data.rant}\n\n`;
    fs.appendFileSync(filePath, content);
    console.log('Data written to file:', fileName);
  } catch (error) {
    console.error('Error while writing to file:', error);
  }
};

// Route to handle form submission
app.post('/submit', async (req, res) => {
  const { nickname, rant } = req.body;
  
  if (!nickname || !rant) {
    return res.status(400).json({ message: 'Nickname and rant are required!' });
  }

  try {
    // Save data to a file
    await saveToFile({ nickname, rant });
    res.json({ message: 'Thank you for your submission!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving submission!' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
