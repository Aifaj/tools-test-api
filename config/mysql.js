const mysql = require('mysql2');

global.db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'atdrive_test'
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");

  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255),
      password VARCHAR(255)
    )`;

  db.query(query);
});
