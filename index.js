const express = require('express');
const ServicesPath = require("./src/services.js")
const app = express();
const puerto = 3100

app.use(ServicesPath);

app.listen(puerto, () =>{
    console.log("escuchando el puerto: "+ puerto)
})