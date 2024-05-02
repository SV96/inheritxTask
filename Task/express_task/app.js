const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors')

const { authMiddleWare } = require("./utils/authMiddleware")

require("dotenv").config();

const usersRoute = require("./routes");

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(authMiddleWare)

mongoose
  .connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("", usersRoute);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
