const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");

app.get('/', express.json(), (req, res) => {
let datos;
    fs.readFile("taks.json", function(err, data) {
    let taks = data.toString()
    datos = JSON.parse(taks)
    res.send(datos)
})
})
app.post("/", express.json(), function (req, res) {
    const obj = req.body
    let taks;
    fs.readFile("taks.json", function (err, data){
        let task = data.toString();
        taks = JSON.parse(task);
        taks.push(obj);
        fs.unlink("taks.json", function (err){
            if (err) throw err;
        });
        fs.appendFile("taks.json", JSON.stringify(taks), function (err){
        })
            if(err) throw err;
        })
        res.send("obtenido")
        console.log(obj);
});
app.listen(port, (req, res) => {
  console.log(`servidor escuchado http://localhost:${port}`);
});
module.exports = app;
