const express = require('express'); // Fix typo here
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');


// Create a database connection
mongoose.connect('mongodb+srv://personalyuvraj24:rXbIK5WahL0Ur3g6@cluster0.227go.mongodb.net/')

.then(()=>console.log('MongoDB connected')).catch(error=> console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:5173', // Remove extra space
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
