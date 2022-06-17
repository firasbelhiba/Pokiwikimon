const mongoose = require('mongoose')

const PokemonSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  baseExperience: {
    type: String,
  },
})

// If mongoose.models.Pokemon exists already we will export that if not we will create a new model based on the PokemonSchema
module.exports =
  mongoose.models.Pokemon || mongoose.model('Pokemon', PokemonSchema)
