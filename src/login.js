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
      
      nombre = data.Nombre
      correo = data.Correo
      data.fecha = new Date();

      console.log(data)

      let query={
        User : us 
      }
      let info = await UsuariosModel.findOne(query).exec()

      if(info==null){
        if(data.Password.length > 7){
          let query_email={
            Correo : correo
          }

          let info_correo = await UsuariosModel.findOne(query_email).exec()

          if(info_correo==null){
            data.Password = await bcrypt.hash(data.Password, 10)
            pw = data.Password

            let registro = new UsuariosModel(data)

            registro.save().then(item=>{
              payload.res = "Register ok"
            }).catch(err =>{
              payload.res = "No saved data"
            })
          }else{
            payload.res = "Email already used"
          }
        }else{
          payload.res = "Password too short"
        }
      }else{
        payload.res = "User Already used"
      }
    }else{
      payload.error = "body nulo"
    }

    res.send(payload)
})

app.post('/login',async (req,res)=>{
    var payload = {
      error : ""
    }
    data = req.body
    
    if (data){
      User_body = req.body.User
      Password_body = req.body.Password

      let query={
        User : User_body
      }

      let info = await UsuariosModel.findOne(query).exec()
      if (info == null){
        payload.error = "Usuario o contraseña Incorrecta"
      }else{
        if (await bcrypt.compare(Password_body,info.Password)){
          payload.res = "Login correcto"
          const token = jwt.sign(data, app.get('key'), {
            expiresIn : 200000
          })
          payload.token = token
        }else{
          payload.error = "Usuario o contraseña Incorrecta"
        }
      }
    }else{
      payload.error = "body nulo"
    }

    console.log(req.body)
    res.send(payload)
})

module.exports = app
