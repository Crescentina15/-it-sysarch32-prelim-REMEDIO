import React from 'react';
import Header from './Header';
import Pokedex from './Pokedex';

const App = () => {
  // Define the API URL
  const apiUrl = 'https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=1';

  return (
    <div>
      <Header />
      {/* Pass the apiUrl as a prop to the Pokedex component */}
      <Pokedex apiUrl={apiUrl} />
    </div>
  );
};

export default App;
