import React, { useState, useEffect } from 'react';

const Pokemon = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pokemon/${pokemonId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for Pokemon ${pokemonId}`);
        }
        const jsonData = await response.json();
        setPokemonData(jsonData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, [pokemonId]);

  const renderTypes = () => {
    if (!pokemonData) return null;
    return pokemonData.type.map((type, index) => (
      <span key={index}>{type}</span>
    ));
  };

  const renderStats = () => {
    if (!pokemonData) return null;
    return Object.entries(pokemonData.base).map(([key, value]) => (
      <div key={key}>
        <strong>{key}: </strong>
        {value}
      </div>
    ));
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {pokemonData && (
        <div>
          <img src={pokemonData.image} alt={pokemonData.name} />
          <h2>{pokemonData.name.english}</h2>
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
