const express = require("express");
const fs= require("fs");
const router = express.Router();


router.get("/&:completada" , (req, res)=>{
    const completada = req.params.completada
    let completados;
    fs.readFile('tareas.json', (req,data)=>{
    let tarea = data.toString();
    completados = JSON.parse(tarea);
    console.log(typeof(completados));
    if(completada === "completada"){

        let filtro = completados.filter(task=> task.completada === true)
        res.send( filtro)
    }
    if(completada === "incompleta"){
        let filtro = completados.filter(task=> task.completada === false)
        res.send( filtro)
    }
    })
})


module.exports = router;