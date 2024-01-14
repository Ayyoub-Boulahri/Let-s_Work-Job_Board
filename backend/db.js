const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'job_board',
    });

    this.connect();
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
      } else {
        console.log('Connected to MySQL!');
      }
    });
  }
}

// Export a singleton instance of the Database class
module.exports = new Database().connection;
