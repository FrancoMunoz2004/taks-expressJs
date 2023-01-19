const express = require("express");
const router = express.Router();
const fs = require("fs")

router.use(express.json())
router.get("/listar" ,express.json(), function(req, res){
    let datos ;
    fs.readFile('tareas.json', function(err, data) {
        let tarea = data.toString();
        datos = JSON.parse(tarea);
        res.send({tareas: datos})
    
    })
    
    })
router.post("/agregar", express.json(), function(req,res){
    const datas= req.body;
        let tareas;
        fs.readFile('tareas.json', function(err, data) {
        let tarea = data?.toString();
        tareas = JSON.parse(tarea);
        tareas.push(datas)
        console.log(tareas)
    
        fs.unlink('tareas.json' , function(error){
            if(error)throw error;
        });
        fs.appendFile('tareas.json', JSON.stringify(tareas), function(error){
            if(error)throw error;  
        })   

        });
        res.send("guardado")
})
router.delete("/eliminar/&:ide", (req, res)=>{
    const ide= parseInt(req.params.ide);
    console.log(ide)
    let delet;
    fs.readFile('tareas.json', (req , data)=>{
    let tarea = data.toString()
    delet = JSON.parse(tarea)
    let filtrar = delet.filter(task=> task.id != ide)
    console.log(filtrar);
    
    fs.unlink('tareas.json',(error)=>{
        if(error) throw error
    })
    
    fs.appendFile('tareas.json',JSON.stringify(filtrar),(error)=>{
        if(error)throw error
    })
    res.send(filtrar)
})

})
router.put("/actualizado/&:ide",(req, res)=>{
    const ide= parseInt(req.params.ide);
    let datos ;
    const {body}= req;
  
    fs.readFile('tareas.json', (req, data)=>{
        let datas= data.toString();
        datos = JSON.parse(datas);

        let tarea = datos.filter(task => task.id === ide )
        tarea[0].tarea = body.tarea;
        tarea[0].completada = body.completada;
        tarea[0].descripcion = body.descripcion;
        

        let neww = datos.filter(task => task.id !== ide)
        neww.push(tarea[0])

        fs.unlink('tareas.json',(error)=>{
            if(error) throw error
        })  
        fs.appendFile('tareas.json', JSON.stringify(neww), (error)=>{
            if(error)throw error
        })
        
    
    })
})


module.exports= router;