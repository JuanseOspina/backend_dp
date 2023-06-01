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
  
var UsuariosModel = mongoose.model("Usuarios",usuarios_tabla)
var DispositivosModel = mongoose.model("Dispositivos",dispositivos_tabla)

module.exports = {
  UsuariosModel,
  DispositivosModel
}
