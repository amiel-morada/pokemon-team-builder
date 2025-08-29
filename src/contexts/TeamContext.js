import React, { createContext, useEffect, useState } from 'react';


export const TeamContext = createContext();


export function TeamProvider({ children }) {
const [team, setTeam] = useState(() => {
try {
const raw = localStorage.getItem('my-pokemon-team');
return raw ? JSON.parse(raw) : [];
} catch (e) { return []; }
});


useEffect(() => {
try { localStorage.setItem('my-pokemon-team', JSON.stringify(team)); } catch (e) {}
}, [team]);


function addPokemon(pokemon) {
setTeam(prev => {
if (prev.some(p => p.name === pokemon.name)) return prev;
if (prev.length >= 6) return prev;
return [...prev, pokemon];
});
}


function removePokemon(name) {
setTeam(prev => prev.filter(p => p.name !== name));
}

function clearTeam() {
	setTeam([]);
}


return (
<TeamContext.Provider value={{ team, addPokemon, removePokemon, clearTeam }}>
{children}
</TeamContext.Provider>
);
}