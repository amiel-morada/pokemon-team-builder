import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import { TeamContext } from "../contexts/TeamContext";

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default function PokemonModal({ pokemonUrl, onClose }) {
  const { data, loading, error } = useFetch(pokemonUrl);
  const { team, addToTeam } = useContext(TeamContext);

  if (!pokemonUrl) return null;

  const inTeam = data && team.some((p) => p.id === data.id);
  const teamFull = team.length >= 6;

  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose} aria-label="Close">
          ×
        </button>

        {loading && <p>Loading…</p>}
        {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

        {data && (
          <>
            <div className="modalHeader">
              <div className="dexNumber">#{data.id}</div>
              <h2 className="pokemonName">{cap(data.name)}</h2>
            </div>

            <div className="modalBody">
              <img
                className="modalArt"
                src={
                  data.sprites?.other?.["official-artwork"]?.front_default ||
                  data.sprites?.front_default
                }
                alt={data.name}
                draggable="false"
              />

              <div className="modalInfo">
                <div className="types">
                  {data.types
                    .map((t) => cap(t.type.name))
                    .join(" / ")}
                </div>

                <button
                  className="primaryBtn"
                  disabled={inTeam || teamFull}
                  onClick={() =>
                    addToTeam({
                      id: data.id,
                      name: data.name,
                      types: data.types.map((t) => t.type.name),
                      sprite:
                        data.sprites?.front_default ||
                        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
                    })
                  }
                >
                  {inTeam
                    ? "Already in Team"
                    : teamFull
                    ? "Team Full"
                    : "Add to Team"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
