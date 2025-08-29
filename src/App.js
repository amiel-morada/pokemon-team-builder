import React from 'react';
import Pokedex from './components/Pokedex';
import TeamView from './components/TeamView';
import './App.css';


export default function App() {
return (
<div className="app-root">
<header className="app-header">
<h1>Pokémon Team Builder</h1>
</header>
<main className="app-main">
<Pokedex />
<TeamView />
</main>
<footer className="app-footer">Built with PokéAPI — First 151 Pokémon</footer>
</div>
);
}