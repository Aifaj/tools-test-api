const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional test query
pool.query("SELECT 1", (err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = pool.promise();


// In production APIs, we use mysql2.createPool() instead of createConnection()
// because pool handles multiple concurrent requests efficiently and automatically manages connections.


// const mysql = require('mysql2');

// global.db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'atdrive_test'
// });

// db.connect(err => {
//   if (err) throw err;
//   console.log("MySQL Connected");

//   const query = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(100),
//       email VARCHAR(100) UNIQUE,
//       password VARCHAR(255),
//       role VARCHAR(20) DEFAULT 'user'
//     )`;

//   db.query(query);
// });





// above code directly create table inside atdrive_test database no manuall if you want manual then use bellow



// const mysql = require("mysql2");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "atdrive_test",
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log("MySQL Connected");
// });

// module.exports = db;





// module.exports = (sequelize, DataTypes) => {
//   return sequelize.define(
//     'User',
//     {
//       userId: {
//         type: DataTypes.BIGINT,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },

//       name: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },

//       email: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//     },
//     {
//       tableName: 'user_mst',   // your MySQL table name
//       timestamps: false,       // you don't want createdAt/updatedAt
//     }
//   );
// };