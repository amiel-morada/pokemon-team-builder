import React, { useContext } from 'react';
import { TeamContext } from '../contexts/TeamContext';


export default function TeamView() {
const { team, removePokemon } = useContext(TeamContext);
const slots = Array.from({ length: 6 }, (_, i) => team[i] || null);


return (
<aside className="teamview">
<h2>Your Team</h2>
<div className="team-grid">
{slots.map((p, i) => (
<div key={i} className="team-slot" onClick={() => p && removePokemon(p.name)}>
{p ? (
<>
<img src={p.sprite} alt={p.name} />
<div className="slot-name">{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</div>
</>
) : (
<div className="empty">Empty</div>
)}
</div>
))}
</div>
<p className="hint">Click a filled slot to remove a Pokémon.</p>
</aside>
);
}