//Get express
const express = require("express");
const app = express();

//Get dotenv and configure it
const dotenv = require("dotenv");
dotenv.config();

//Get rid of cors policy error
const cors=require("cors")
app.use(cors())

//Make pp understand json
app.use(express.json())

//Listen to the port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening to: ${port}`);
});
