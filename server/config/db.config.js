const mysql = require("mysql");

// Create mysql connection.
const con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

con.connect((err) => {
  if (err) {
    console.log(`Error connecting to database: ${err}`);
    return;
  }

  console.log("Connection to database established");
});

module.exports = con;
