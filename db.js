// db.js
const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://:92eS7IZwlbhYP83F@cluster0.c48km.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
  }
)

module.exports = mongoose