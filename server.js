const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

const { exec } = require("child_process");
const command = `json-server --watch db.json --port ${port}`;

exec(command);

app.use(express.static(__dirname + "/dist"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/dist", "index.html"));
});

app.listen(port);
