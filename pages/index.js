//Nextjs
import Image from 'next/image'

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
  return `https://pokewikimon-1ng3idxaz-firasbelhiba.vercel.app/api/pokewikimon?page=${pageIndex + 1}`
}

export default function Home() {
  const { pokemons, isLoading, isLoadingMore, size, setSize } = usePokemon(
    getKey,
    fetcher,
  )

  const loadMore = () => {
    setSize(size + 1)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="background-image">
      <div className="container text-center">
        <div className="row">
          {pokemons?.map((pokemonArray, index) => {
            return pokemonArray.map((pokemon) => (
              <>
                <div className="col-md-3">
                  <Card key={pokemon._id}  {...pokemon} />
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
          <Image
            src="https://res.cloudinary.com/habibii/image/upload/v1655504374/Sans_titre-1_drzmlv.jpg"
            alt="pokemon-button"
            width={300}
            height={300}
          />
          <div></div>
        </div>
      </div>
    </div>
  )
}
