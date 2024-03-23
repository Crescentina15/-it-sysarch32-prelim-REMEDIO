import React, { useState, useEffect } from 'react';
import Header from './Header';
import Pokedex from './Pokedex';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=1');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setPokemonData(jsonData.data);
      setTotalPages(jsonData.totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Header />
      <Pokedex pokemonData={pokemonData} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default App;
