// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
function Pokemon({ pokemon, language }) {
  const { id, name, type, base, image } = pokemon;

  const getName = () => {
    switch (language) {
      case 'japanese':
        return name.japanese;
      case 'chinese':
        return name.chinese;
      case 'french':
        return name.french;
      default:
        return name.english;
    }
  };

  return (
    <div className="pokemon">
      <div className="image-container">
        <img src={image} alt={getName()} className="pokemon-image" />
      </div>
      <div className="details">
      <div><strong></strong> {getName()}</div>
      <br></br>
        <div><strong>ID:</strong> {id}</div>
        <div><strong>Type:</strong> {type.join(', ')}</div>
        <div><strong>HP:</strong> {base.HP}</div>
        <div><strong>Attack:</strong> {base.Attack}</div>
      </div>
    </div>
  );
}

export default Pokemon;
