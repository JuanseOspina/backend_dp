const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const config = require('./conf');

app.use(express.json())
app.set('key',config.key)
const authMiddleware = express.Router()

authMiddleware.use((req, res, next)=>{
    const token = req.headers['access-token']
    if (token){
      jwt.verify(token, app.get('key'), (err, decoded)=>{
        if(err){
          return res.json({error: 'Error Token'})
        }
        req.decoded = decoded
        next()
      })

    }else{
      res.send({
        error : "Token null"
      })
    }
})

module.exports = authMiddleware;
