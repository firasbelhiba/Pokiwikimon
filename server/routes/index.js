const express = require('express')
const router = express.Router()

//Model
const Pokemon = require('../../models/Pokemon')

//@author Firas Belhiba
//@route GET api/pokewikimon
//@desc This route will give us all our pokemons
//@access Public
router.get('/pokewikimon', async (req, res) => {
  const page = req.query.page
  const default_limit = 12

  const startIndex = (page - 1) * default_limit
  const endIndex = page * default_limit
  const skip = req.query.skip ? Number(req.query.skip) : 0
  try {
    const pokemons = await Pokemon.find()

    res.json(pokemons.slice(startIndex, endIndex))
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

//@author Firas Belhiba
//@route GET api/pokewikimonapi
//@desc This route will fetch us all pokemons from the api ( https://pokeapi.co/api/v2/pokemon/ )
router.get('/pokewikimonapi', async (req, res) => {
  const api = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')

  if (api.ok) {
    const rawData = await api.json()

    try {
      await rawData.results.forEach(async (pokemon, index) => {
        // We will check if the pokemon already exist
        let pokemonObject = await Pokemon.findOne({ name: pokemon.name })

        if (pokemonObject) {
          await console.log(`${pokemon.name} number: ${index} already saved`)
          return
        }

        let pokemonStats = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        )

        const pokemonData = await pokemonStats.json()

        pokemonObject = new Pokemon({
          name: pokemon.name,
          imageUrl: pokemonData.sprites.other.dream_world.front_default,
          baseExperience: pokemonData.base_experience,
        })

        await pokemonObject.save()
        await console.log(`${pokemon.name} number: ${index} is saved`)
      })

      res.status(200).json({
        success: [{ message: 'Database is updating ...' }],
      })
    } catch (error) {
      console.log(error)
    }
  }
})

module.exports = router
