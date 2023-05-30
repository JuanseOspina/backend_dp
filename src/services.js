const LoginPath = require("./login.js")
const authMiddleware = require('./authMiddleware');
const UsuariosModel = require('./database');
const { DispositivosModel } = require('./database');
const app = require('express')()

app.use(LoginPath);

app.get('/time',authMiddleware,(req,res) =>{
    let time = new Date;
    console.log("Time requested");
    console.log(req.body)
    var payload = {
        time: time
    }
    res.status(200).send(payload);
})

app.post('/temp',authMiddleware,(req,res) => {
    console.log(req.body)
    const temperature = req.body.temp;
    const timestamp = new Date().toISOString();

    console.log(temperature)
    res.status(200).send("Temperature registrated at "+ timestamp);
})

app.post('/pres',authMiddleware,(req,res) => {
    console.log(req.body)
    const timestamp = new Date().toISOString();

    res.status(200).send("Presence registrated at "+ timestamp);
})

app.post('/dev',authMiddleware,(req,res) => {
    console.log(req.body)
    const timestamp = new Date().toISOString();

    res.status(200).send("Presence registrated at "+ timestamp);
})

app.post('/DB',authMiddleware, async(req,res)=>{
    let cedula = req.body.cedula 
    let query ={
      cedula : cedula
    }
    let data = await UsuariosModel.findOne(query).exec()
    res.send(data)
  })

module.exports = app