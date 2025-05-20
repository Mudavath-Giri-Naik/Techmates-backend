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

app.use('/posts', postsRouter); // All /posts endpoints
app.use('/Users', usersRouter); // All /Users endpoints

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
