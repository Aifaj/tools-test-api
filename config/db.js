// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     logging: false,
//   }
// );

// module.exports = sequelize;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: console.log,
  }
);

sequelize.authenticate()
  .then(() => console.log("MySQL Connected Successfully"))
  .catch(err => console.error("DB Connection Error:", err, "Host:", process.env.DB_HOST, "Port:", process.env.DB_PORT));

module.exports = sequelize;


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