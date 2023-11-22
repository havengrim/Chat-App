const express = require('express');
const bcryptjs = require('bcryptjs');

// Connect db
require('./db/connection');

// Import files
const Users = require('./models/Users');

// App use
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

// routes
app.get('/', (req, res) => {
  res.send('Welcome');
});

app.post('/api/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).send('Please fill all required fields');
    }

    const isAlreadyExist = await Users.findOne({ email });

    if (isAlreadyExist) {
      return res.status(400).send('User already exists');
    }

    const newUser = new Users({ fullName, email });

    bcryptjs.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        throw err; // Handle the error, log it, or send an appropriate response
      }

      newUser.set('password', hashedPassword);
      newUser.save();

      return res.status(200).send('User registered successfully');
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
