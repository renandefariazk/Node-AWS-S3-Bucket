const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

const homeRoute = require("./routes/homeRoute");
const awsRoute = require("./routes/awsRoute");

app.use("/", homeRoute, awsRoute);

app.listen(port, () =>{
  console.log(`Projeto Iniciado ${port}`);
});