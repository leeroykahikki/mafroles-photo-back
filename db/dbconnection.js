const mongoose = require('mongoose');

async function dbconnect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mafroles');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = dbconnect;
