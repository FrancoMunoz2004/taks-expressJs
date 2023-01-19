const express = require("express");
const fs = require("fs");
const app = express();
const port = 8020;
const list = require("./list-edid-router");
const completados = require("./list-view-router");
app.use("/estado", completados);
app.use("/lista", list);
app.use(express.json());
app.get("/", function (req, res) {
  let datos;
  fs.readFile("tareas.json", function (err, data) {
    let tarea = data.toString();
    datos = JSON.parse(tarea);
    res.send({ tareas: datos });
  });
});

app.listen(port, function () {
  console.log(`el servidor esta escuchando en http://localhost:${port} `);
});
