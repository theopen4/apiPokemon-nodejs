const express = require('express')
const pokemons = require('./mock-pokemon')
const {sucess, getUniqueId} = require('./helper')
const {Sequelize} = require('sequelize')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const port = 3000
app
   .use(favicon(__dirname + '/favicon.ico'))
   .use(morgan('dev'))
   .use(bodyParser.json())
   
app.get('/api/pokemon',(req, res)=>{
    const message ="la liste complete de tous les pokemons "
    res.json(sucess(message,pokemons))
   
    
    
})
app.get('/api/pokemon/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemone => {
        return pokemone.id === id
    })
    const message = `le pokemom ${pokemon.name} a bien ete trouve`
    res.json(sucess(message,pokemon))
})
app.put('/api/pokemon/:id',(req,res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = {...req.body, id:id}
    pokemons.map(pokemon => {
      return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message =`le pokemon ${pokemonUpdated.name} a bien ete modifie`
    res.json(sucess(message, pokemonUpdated))
  
  
  })
app.post('/api/pokemon', (req,res)=>{
    const id = getUniqueId(pokemons)  
    const addpokemon = {...req.body, ...{id: id, created: new Date()}}
    pokemons.push(addpokemon)
    message = `le pokemon ${addpokemon.name} a bien ete modifie`
    res.json(sucess(message,addpokemon))
})
app.delete('/api/pokemon/:id', (req, res)=>
{
  const id = parseInt(req.params.id)
  const pokemonDelected = pokemons.find(pokemone => pokemone.id === id)
  pokemons.filter(pokemoni => pokemoni.id !== id)
  const messages = `le pokemon ${pokemonDelected.name} a bien ete supprime`
  res.json(sucess(messages,pokemonDelected))
})
const sequelize = new Sequelize('pokedex', 'root','',{
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions:{
      timezone: 'Etc/GMT-2',
    },  
    logging: false
})
app.listen(port,()=>{console.log(`votre aplicaion a demarre sur le localhost: ${port}`)})