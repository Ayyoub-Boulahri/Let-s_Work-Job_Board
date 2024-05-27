const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Export a singleton instance of the Database class
module.exports = mongoose;
