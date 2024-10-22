import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100'); // Fetch more Pokémon for better display
      const data = await response.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setPokemons(detailedPokemons);
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className="border rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 bg-white"
          >
            <Link to={`/pokemon/${pokemon.name}`} className="block text-center">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto mb-2 w-32 h-32"
              />
              <h2 className="text-xl font-semibold text-blue-600 capitalize">{pokemon.name}</h2>
              <p className="text-gray-500">Height: {pokemon.height}</p>
              <p className="text-gray-500">Weight: {pokemon.weight}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
