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

//nos different point de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findpokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

// on ajoute la gestion des erreurs 404
app.use(({res}) =>{
  const message = 'la ressource demande  nexiste pas '
  res.status(404).json({message})
})
app.listen(port,()=>{console.log(`votre aplicaion a demarre sur le localhost: ${port}`)})
