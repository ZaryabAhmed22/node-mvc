const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_complete",
  password: "MYSQLkapasswordnhibhoolnahai.",
});

module.exports = pool.promise();
