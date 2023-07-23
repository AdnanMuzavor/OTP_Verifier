const express = require("express");
const UserController = require("../Controller/UserController");

const UserRouter = express.Router();

UserRouter.post("/login", UserController.UserLogin);
UserRouter.post("/register",UserController.RegisterUser);
UserRouter.post("/verify",UserController.VerfyOTP);
module.exports = UserRouter;
