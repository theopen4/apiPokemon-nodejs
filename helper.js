exports.sucess =(messsage,data)=>{
    return{messsage, data}
}
exports.getUniqueId = (pokemons)=>{
    const pokemonsId = pokemons.map(pokemon=>pokemon.id)
    const maxId = pokemonsId.reduce((a,b)=>{
        Math.max(a,b)
        return Math.max(a,b) + 1
    })
    return maxId
    
}