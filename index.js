const express = require('express');
const app = express();
const dotenv = require('dotenv')
const projectRoute = require('./routes/projects')
const categoryRoute = require('./routes/categories');
const mongoose = require('mongoose');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to Mongo"))
    .catch((err) => console.log(err))

app.use("/api/projects", projectRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
    console.log("Backend is running in port 5000");
})


app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});