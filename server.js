const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname + "/dist"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/dist", "index.html"));
});

app.listen(port);

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(port, function() {
  console.log("JSON Server is running");
});
