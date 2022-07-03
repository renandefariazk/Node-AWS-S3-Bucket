const express = require("express");
const route = express.Router();
const awsController = require("../controller/awsController");

route.get("/aws-get/:keyName", awsController.getFileUrlSigned);
route.post("/aws-post", awsController.addFile);

module.exports = route;
