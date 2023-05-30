const express = require('express');
const config = require('./conf');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { UsuariosModel } = require('./database');
const app = express();

us = ""
pw = ""

app.use(express.json())
app.set('key',config.key)

//-------------------------------------------------------------------------------------//

app.post('/register', async (req,res)=>{
    var payload = {
      error : ""
    }
    
    data = req.body
  
    if(data){
      us = data.User
      data.Password = await bcrypt.hash(data.Password, 10)
      pw = data.Password
      nombre = data.Nombre
      cedula = data.Cedula
      correo = data.Correo
      data.fecha = new Date();

      console.log(data)

      let registro = new UsuariosModel(data)

      registro.save().then(item=>{
        console.log("saved")
        payload.res = "Register ok"
        res.send(payload)
      }).catch(err =>{
        console.log("No saved")
        payload.res = "No saved data"
        res.send(payload)
      })

    }else{
      payload.error = "body nulo"
    }
})

app.post('/login',async (req,res)=>{
    var payload = {
      error : ""
    }
  
    data = req.body
  
    if(data){
      if(data.User == us){
        if(await bcrypt.compare(data.Password,pw)){
          payload.res = "Login correcto"
          const token = jwt.sign(data, app.get('key'), {
            expiresIn : 300
  
          })
          payload.token = token
        }else{
          payload.res = "Usuario o contraseña incorrectos"
        }
        
      }else{
        payload.res = "Usuario o contraseña incorrectos"
      }
  
    }else{
      payload.error = "body nulo"
    }
    console.log(req.body)
    res.send(payload)
})

module.exports = app
