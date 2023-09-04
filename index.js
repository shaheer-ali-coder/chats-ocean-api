const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const filePath = './public/signup.json'; // Define the file path here
const filepath = './public/questions.json'
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cors()); // Enable CORS for all routes

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: 'PUT, GET, POST, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));

// Route for the root path "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Route for "/about"
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pricing.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});
app.get('/bot', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bot.html'));
});
app.post('/data', async (req, res) => {
  const requestData = req.body;
  console.log(requestData);

  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      // Parse the existing JSON data
      const existingData = JSON.parse(data);

      const existingUser = existingData.user[requestData.name]; // Get the existing user data

      // Check if the user already exists
      if (existingUser) {
        const newId = Object.keys(existingUser).length + 1; // Generate the new ID
        existingUser[newId] = requestData[requestData.name][newId]; // Add new question and answer
      } else {
        // Increment the userIdCounter
        const newUserId = existingData.userIdCounter + 1;
        existingData.userIdCounter = newUserId;

        // Create or initialize the 'user' property if it doesn't exist
        if (!existingData.user) {
          existingData.user = {};
        }

        // Add the new data with the incremented counter
        existingData.user[newUserId] = requestData;

        // Convert the updated data back to JSON
        const updatedJson = JSON.stringify(existingData, null, 2);

        // Write the updated JSON back to the file
        fs.writeFile(filepath, updatedJson, 'utf8', (err) => {
          if (err) {
            console.error('Error writing JSON file:', err);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            console.log('Data appended and saved to JSON file.');
            res.json({ message: 'Data saved successfully' });
          }
        });
      }

      // Write the modified data back to the file
      // Write the updated JSON back to the file
fs.writeFile(filepath, updatedJson, 'utf8', (err) => {
  if (err) {
    console.error('Error writing JSON file:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } else {
    console.log('Data appended and saved to JSON file.');
    // Do not send response here
  }
});
} catch (parseError) {
  console.error('Error parsing JSON data:', parseError);
  res.status(500).json({ error: 'Internal Server Error' });
}
});


app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'questions.json'));
})
// ... other routes ...

// GET route to fetch data
app.get('/api', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData); // Send the JSON data in response
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

// POST route to save data
app.post('/api', (req, res) => {
  const newData = req.body;

  console.log('Received data:', newData);
  const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Increment the user ID
  const newUserId = existingData.userIdCounter + 1;
  existingData.userIdCounter = newUserId;
  existingData.user[newUserId] = newData;
  // Convert the updated data back to JSON
  const updatedJson = JSON.stringify(existingData, null, 2);

  // Write the updated JSON back to the file
  fs.writeFile(filePath, updatedJson, 'utf8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
      res.json({ message: 'Data saved successfully' });
    }else{
      res.json({ message: 'Data saved successfully' });
    }
  });
})
app.get('/platforms', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'platforms.html'));
});
app.get('/dataplatform', (req, res) => {
  fs.readFile("./public/platform.json", 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData); // Send the JSON data in response
      // console.log(res.json(jsonData))
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

const PORT = 80;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});})
