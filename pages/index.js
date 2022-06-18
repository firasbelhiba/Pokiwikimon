//Nextjs
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Components
import Card from '../components/card'
import Loader from '../components/loader'

// Hooks
import usePokemon from '../hooks/usePokemon'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// I should've used axios because fetch is not supported in all browsers
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null
  return `http://localhost:3000/api/pokewikimon?page=${pageIndex}`
}

export default function Home() {
  const { pokemons, isLoading, isLoadingMore, size, setSize } = usePokemon(
    getKey,
    fetcher,
  )

  const loadMore = () => {
    if (isLoadingMore) {
      return
    }
    setSize(size + 1)
  }

  if (isLoading) {
    return <Loader />
  }

  document.onscroll = async function () {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      loadMore()
    }
  }

  return (
    <div className="background-image">
      <div className="container text-center">
        <div className="row">
          {pokemons?.map((pokemonArray, index) => {
            return pokemonArray.map((pokemon) => (
              <>
                <div className="col-md-3">
                  <Card key={pokemon._id} {...pokemon} />
                </div>
              </>
            ))
          })}
          {isLoadingMore ? (
            <div className="text-center">
              <Image
                onClick={loadMore}
                style={{
                  cursor: 'pointer',
                }}
                className="pokeball"
                src="https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-Images.png"
                alt="pokemon-button"
                width={100}
                height={100}
              />
            </div>
          ) : (
            <div className="text-center">
              <Image
                onClick={loadMore}
                style={{
                  cursor: 'pointer',
                }}
                src="https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-Images.png"
                alt="pokemon-button"
                width={100}
                height={100}
              />
            </div>
          )}
          <div></div>
        </div>
      </div>
    </div>
  )
}
