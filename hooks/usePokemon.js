import useSWRInfinite from 'swr/infinite'

export default function usePokemon(getKey, fetcher) {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher)

  return {
    pokemons: data,
    isLoading: !data && !error,
    isLoadingMore:
      (!data && !error) ||
      (size > 0 && data && typeof data[size - 1] === 'undefined'),
    size: size,
    setSize: setSize,
  }
}
