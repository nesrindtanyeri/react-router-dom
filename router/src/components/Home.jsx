import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
      const data = await response.json();
      setPokemons(data.results);
    };
    fetchPokemons();
  }, []);

  return (
    <div className="p-4 bg-gradient-to-r from-blue-200 to-blue-400 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            className="border rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 bg-white"
          >
            <Link to={`/pokemon/${pokemon.name}`} className="block text-center">
              <h2 className="text-xl font-semibold text-blue-600">{pokemon.name}</h2>
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Image Placeholder</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

