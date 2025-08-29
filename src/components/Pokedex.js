import React, { useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import PokemonCard from './PokemonCard';
import SearchBar from './SearchBar';


export default function Pokedex() {
const { data: pokemonList, loading, error } = useFetch('https://pokeapi.co/api/v2/pokemon?limit=151');
const [query, setQuery] = useState('');
const [typeFilter, setTypeFilter] = useState('');


const filtered = useMemo(() => {
if (!pokemonList || !pokemonList.results) return [];
const q = query.trim().toLowerCase();
return pokemonList.results.filter(p => p.name.includes(q));
}, [pokemonList, query]);


return (
<section className="pokedex">
<SearchBar
value={query}
onChange={setQuery}
onTypeChange={setTypeFilter}
/>


{loading && <p>Loading Pokémon...</p>}
{error && <p>Error loading: {error.message || error}</p>}


<div className="grid">
{filtered.map(p => (
<PokemonCard key={p.name} url={p.url} name={p.name} />
))}
</div>
</section>
);
}