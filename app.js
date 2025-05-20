// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Working endpoints:
// GET https://techmates-backend.onrender.com/posts?type=event - Get all posts of type event
// GET https://techmates-backend.onrender.com/Users/:id - Get user details by ID
// GET https://techmates-backend.onrender.com/Users/college?college_name=Example College - Get all users from a specific college

// Local development endpoints:
// GET http://localhost:3000/Users/college?college_name=MVGR - Get all users from a specific college (local)

app.use('/posts', postsRouter); // All /posts endpoints
app.use('/Users', usersRouter); // All /Users endpoints

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
