const express = require('express');
const app = express();
const dotenv = require('dotenv')
const projectRoute = require('./routes/projects')
const categoryRoute = require('./routes/categories');
const mongoose = require('mongoose');
const path = require('path')
const process = require('process')

dotenv.config();
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.use(express.static(path.join(__dirname, 'build')));

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to Mongo"))
    .catch((err) => console.log(err))

app.use("/api/projects", projectRoute);
app.use("/api/categories", categoryRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend is running in port 5000");
})

