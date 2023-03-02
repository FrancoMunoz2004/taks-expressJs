const express = require("express");
const user = express.Router();
const Users = require("../models/users");
const jwt = require("jsonwebtoken");

user.post("/agregar", async (req, res) => {
  const { email, password,nombre,apellidos } = req.body;
  if (!email)
    return res
      .status(404)
      .json({ msg: "se requiere email para esta peticion" });

  try {
    const alreadyUser = await Users.findOne({
      email: email,
    });
    if (alreadyUser)
      return res
        .status(404)
        .json({ msg: "ya existe un usuario con ese email" });
    const users =  Users({
      email,
      nombre,
      password: await Users.encryptPassword(password),
      apellidos,
    });
    await users.save();
    res.json({ msg: "Usuario creado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "hable con el admin" });
  }
});
user.patch("/", async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  if (!email || !password)
    return res
      .status(404)
      .json({ msg: "se requiere email y contraseña para esta peticion" });
  try {
    const usuario = await Users.findOne({
      email: email,
    });
    if (!usuario)
      return res
        .status(404)
        .json({ msg: "El usuario no se encuentra registrado", usuario: null });
    const comparePassword = await Users.comparePassword(
      req.body.password,
      usuario.password
    );
    if (!comparePassword || !usuario)
      return res.status(401).json({ msg: "El usuario o la contraseña son incorrectos", usuario: null });
    const token = jwt.sign({ usuario }, "Mamaguevo", { expiresIn: 60 * 60 });
    res.json({ usuario, msg: "sign in", token });
  } catch (error) {
    res.status(500).json({ msg: "hable con el admin" });
  }
});
module.exports = user;
