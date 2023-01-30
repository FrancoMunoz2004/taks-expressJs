const express = require("express");
const fs = require("fs");
const router = express.Router();
const validationEstado = (req, res, next) => {
  const completada = req.params.completada;
  if (completada === "completada" || completada === "incompleta") {
    next();
  } else {
    res.status(400).send("bad request");
  }
};

router.get("/&:completada", validationEstado, (req, res) => {
  const completada = req.params.completada;
  let completados;
  fs.readFile("tareas.json", (req, data) => {
    let tarea = data.toString();
    completados = JSON.parse(tarea);
    console.log(typeof completados);
    if (completada === "completada") {
      let filtro = completados.filter((task) => task.completada === true);
      res.send(filtro);
    }
    if (completada === "incompleta") {
      let filtro = completados.filter((task) => task.completada === false);
      res.send(filtro);
    }
  });
});

module.exports = router;
