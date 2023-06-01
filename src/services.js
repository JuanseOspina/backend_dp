const LoginPath = require("./login.js")
const authMiddleware = require('./authMiddleware');
const { DispositivosModel } = require('./database');
const { UsuariosModel } = require('./database');
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

app.post('/dev',authMiddleware, async(req,res) => {
    var payload = {
        error : ""
    }

    const timestamp = new Date().toISOString();
    data = req.body
    data.fecha = timestamp

    let query ={
        User : data.User
    }

    let query_dev ={
        MAC : data.MAC
    }

    let info_user = await UsuariosModel.findOne(query).exec()

    if(info_user == null){
        payload.res = "User not found"
    }else{
        let dev_info = await DispositivosModel.findOne(query_dev).exec()

        if (dev_info == null){
            let registro = new DispositivosModel(data)
            registro.save().then(item=>{
                payload.res = "Register ok"
            }).catch(err =>{
                payload.res = "No saved data"
            })
        }else{
            payload.res = "Device already registed"
        } 
    }

    res.status(200).send(payload);
})

module.exports = app