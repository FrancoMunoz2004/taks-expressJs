const express = require("express");
const router = express.Router();
const tareas = require("./tareas.json");
const { validation, validatePost, validatePut, validationPut } = require("./middleware/peticiones");
const fs = require("fs");

router.use(express.json());
router.get("/listar", express.json(), function (req, res) {
  let datos;
  fs.readFile("tareas.json", function (err, data) {
    let tarea = data.toString();
    datos = JSON.parse(tarea);
    res.send({ tareas: datos });
  });
});
router.post("/agregar", validation, validatePost, function (req, res) {
  const datas = req.body;
  tareas.push(datas);
  fs.writeFileSync("./tareas.json", JSON.stringify(tareas), (error) => {
    if (err) throw err;
    console.log("Error vite?");
  });
  console.log(datas);
  res.json({ message: "Su tarea fue agregada y con exito" });
});
router.delete("/eliminar/&:ide", (req, res) => {
  const ide = parseInt(req.params.ide);
  console.log(ide);
  let delet;
  fs.readFile("tareas.json", (req, data) => {
    let tarea = data.toString();
    delet = JSON.parse(tarea);
    let filtrar = delet.filter((task) => task.id != ide);
    console.log(filtrar);

    fs.unlink("tareas.json", (error) => {
      if (error) throw error;
    });

    fs.appendFile("tareas.json", JSON.stringify(filtrar), (error) => {
      if (error) throw error;
    });
    res.send(filtrar);
  });
});
router.put("/actualizado/&:ide",validatePut,validationPut, (req, res) => {
  const ide = parseInt(req.params.ide);
  let datos;
  const { body } = req;

  fs.readFile("tareas.json", (req, data) => {
    let datas = data.toString();
    datos = JSON.parse(datas);

    let tarea = datos.filter((task) => task.id === ide);
    tarea[0].nombre = body.nombre;
    tarea[0].completada = body.completada;
    tarea[0].descripcion = body.descripcion;

    let neww = datos.filter((task) => task.id !== ide);
    neww.push(tarea[0]);

    fs.unlink("tareas.json", (error) => {
      if (error) throw error;
    });
    fs.appendFile("tareas.json", JSON.stringify(neww), (error) => {
      if (error) throw error;
    });
  });
  res.send('tarea actualizada')
});

module.exports = router;
