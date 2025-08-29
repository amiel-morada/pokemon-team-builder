import React from "react";

// Small grid cell (thumbnail). We compute ID from the API URL to avoid extra fetches.
export default function PokemonCell({ name, url, onClick }) {
  const id = url.split("/").filter(Boolean).pop();
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <button className="pokeCell" onClick={onClick} title={name}>
      <img src={img} alt={name} draggable="false" />
    </button>
  );
}
