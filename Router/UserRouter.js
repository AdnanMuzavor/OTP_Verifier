const express = require("express");
const UserController = require("../Controller/UserController");

const UserRouter = express.Router();

UserRouter.get("/login", UserController.UserLogin);

module.exports = UserRouter;
