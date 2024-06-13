const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandelers");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactsrouts"));
app.use("/api/users", require("./routes/userRouts"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});