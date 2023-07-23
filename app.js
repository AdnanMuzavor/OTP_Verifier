//Get express
const express = require("express");
const app = express();

//Get dotenv and configure it
const dotenv = require("dotenv");
dotenv.config();

//Get rid of cors policy error
const cors=require("cors");
const UserRouter = require("./Router/UserRouter");
app.use(cors())

//Make pp understand json
app.use(express.json())

//Use all the APIs
app.use("/api/user/otp",UserRouter)

//Connect to DB
require("./DB/Connection/conn")

//Listen to the port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening to: ${port}`);
});
