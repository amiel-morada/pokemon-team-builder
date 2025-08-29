import React, { useEffect, useState, useContext } from 'react';
import { TeamContext } from '../contexts/TeamContext';

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
};

export default function PokemonCard({ url, name }) {
const [info, setInfo] = useState(null);
const [loading, setLoading] = useState(true);
const { team, addPokemon, removePokemon } = useContext(TeamContext);


useEffect(() => {
let mounted = true;
setLoading(true);
fetch(url)
.then(r => r.json())
.then(data => { if (mounted) { setInfo(data); setLoading(false); } })
.catch(() => mounted && setLoading(false));
return () => { mounted = false; };
}, [url]);


if (loading) return <div className="card skeleton">Loading...</div>;
if (!info) return <div className="card">No data</div>;


const inTeam = team.some(t => t.name === name);
const disabled = inTeam || team.length >= 6;
const sprite = info.sprites?.front_default;
const types = info.types.map(t => t.type.name).join(', ');


return (
  <div className="card">
    <img src={sprite} alt={name} className="sprite" />
    <h4>{name.charAt(0).toUpperCase() + name.slice(1)}</h4>
    <div className="types">
      {info.types.map(t => (
        <span
          key={t.type.name.toUpperCase()}
          className={`type-chip type-${t.type.name}`}
          style={{
            display: 'inline-block',
            padding: '2px 8px',
            margin: '0 4px',
            borderRadius: '12px',
            backgroundColor: typeColors[t.type.name] || '#eee',
            color: '#fff',
            fontSize: '0.9em'
          }}
        >
          {t.type.name.toUpperCase()}
        </span>
      ))}
    </div>
    <div className="card-actions">
      <button
        onClick={() => addPokemon({ name, id: info.id, sprite })}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {inTeam ? 'In Team' : team.length >= 6 ? 'Team Full' : 'Add to Team'}
      </button>
    </div>
  </div>
);


}