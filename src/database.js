const { default: mongoose } = require('mongoose');
const connectionstring= "mongodb+srv://j_ospina:Juan68031001@cluster0.jig5fe8.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(connectionstring, {useNewUrlParser : true})

var usuarios_tabla = new mongoose.Schema({
    User: String,
    Password: String,
    Nombre: String,
    Correo: String,
    fecha: Date
})

var dispositivos_tabla = new mongoose.Schema({
  User: String,
  MAC: String,
  fecha: Date
})

var data_tabla = new mongoose.Schema({
  MAC: String,
  fecha: Date,
  temperatura: Number,
  presence: Boolean
})
  
var UsuariosModel = mongoose.model("Usuarios",usuarios_tabla)
var DispositivosModel = mongoose.model("Dispositivos",dispositivos_tabla)
var DataModel = mongoose.model("Data",data_tabla)

module.exports = {
  UsuariosModel,
  DispositivosModel,
  DataModel
}
