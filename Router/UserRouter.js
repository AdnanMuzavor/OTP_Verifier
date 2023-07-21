const express = require("express");
const UserLogin = require("../Controller/UserController");
const UserRouter = express.Router();

UserRouter.get("/login", UserLogin);
