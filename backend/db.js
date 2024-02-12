const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/job_board';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Export a singleton instance of the Database class
module.exports = mongoose;
