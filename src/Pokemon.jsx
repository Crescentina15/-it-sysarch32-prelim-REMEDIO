import React, { useState, useEffect } from 'react';

const Pokemon = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data...'); // Log before fetching
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${pokemonId}`);
        console.log('Response:', response); // Log the response object
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        console.log('Fetched data:', jsonData); // Log fetched data
        setPokemonData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error); // Log errors
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [pokemonId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemonData) return null;

  // Render Pokemon data here
};

export default Pokemon;
