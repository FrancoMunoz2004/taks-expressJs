const mongoose = require("mongoose");
const usuario = require("./users");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  tarea: String,
  descripcion: String,
  estado: Boolean,
  _idUser: { type: Schema.ObjectId, ref: usuario },
});

module.exports = mongoose.model("Tarea", taskSchema);
