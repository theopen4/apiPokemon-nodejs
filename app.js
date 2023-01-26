const express = require('express')
const sequelize = require('./src/db/sequelize')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const port = 3000
app
   .use(favicon(__dirname + '/favicon.ico'))
   .use(morgan('dev'))
   .use(bodyParser.json())

sequelize.initDb()
require('./src/routes/findAllPokemons')(app)
app.listen(port,()=>{console.log(`votre aplicaion a demarre sur le localhost: ${port}`)})
