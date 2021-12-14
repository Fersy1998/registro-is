
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use('/api', usersRoutes)

mongoose
  .connect(
    'mongodb+srv://bebop:VsoWdZHDDpmLQBAP@cluster0.cvgng.mongodb.net/bebop?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
  });

