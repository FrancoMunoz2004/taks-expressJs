const express = require("express");
const login = express.Router();
const db = require("../tareas.json");
const jwt = require("jsonwebtoken");
require("dotenv").config();

login.post("/auth", function (req, res) {
  const userInfo = db.map((tarea) => {
    if (tarea.email == req.body.email) {
      return tarea;
    }
  });
  if (userInfo.length === 0) {
    res.status(401).send({ error: "Invalid user name or password" });
  } else {
    const token = jwt.sign(userInfo[0], process.env.SECRET_KEY);

    res.json({ token });
  }
});

login.get("/protect", function (req, res) {
  const token = req.header("Authorization");
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.send("autenticado");
  } catch (e) {
    res.json({ error:"No autorizado" });
  }
});

module.exports = login;
