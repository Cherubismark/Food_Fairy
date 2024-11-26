// Import the dotenv package to load environment variables from .env file
require("dotenv").config();

// Import the mysql2 package
const mysql = require("mysql2");

// Create a connection to the database using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database");

  // Query: Retrieve the list of food donors and the food they donated
  connection.query(
    "SELECT b.name AS beneficiary, f.name AS food_type, d.delivery_date " +
      "FROM delivery_records d " +
      "JOIN beneficiaries b ON d.beneficiary_id = b.beneficiary_id " +
      "JOIN food_types f ON d.food_type_id = f.food_type_id",
    (err, results) => {
      if (err) {
        console.error("Error executing the query:", err.stack);
        return;
      }

      console.log("Food Distribution Information:");
      console.table(results); // This will display the results in a table format
    }
  );
});
