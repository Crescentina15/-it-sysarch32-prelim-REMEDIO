import React, { useState, useEffect } from 'react';

const Pokemon = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetchPokemonData();
  }, [pokemonId]);

  const fetchPokemonData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setPokemonData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderTypes = () => {
    if (!pokemonData) return null;
    return pokemonData.types.map((type, index) => (
      <span key={index}>{type.type.name}</span>
    ));
  };

  const renderStats = () => {
    if (!pokemonData) return null;
    return pokemonData.stats.map(stat => (
      <div key={stat.stat.name}>
        <strong>{stat.stat.name}: </strong>
        {stat.base_stat}
      </div>
    ));
  };

  return (
    <div>
      {pokemonData && (
        <div>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <h2>{pokemonData.name}</h2>
          <div>
            <strong>ID: </strong>
            {pokemonData.id}
          </div>
          <div>
            <strong>Type(s): </strong>
            {renderTypes()}
          </div>
          <div>
            <strong>Additional Info:</strong>
            {renderStats()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
