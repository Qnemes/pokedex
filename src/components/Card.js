import React from 'react';
import typeColors from './elementColor'

function Card({ pokemon }) {
    return (
        <div className="card">
            <div className="card__image">
                <img src={pokemon.sprites.front_default} alt="Pokemon" />
            </div>
            <div className="card__name">
                {pokemon.name}
            </div>
            <div className="card__types">
                {
                    pokemon.types.map((type, i) => {
                        return (
                            <div key={i} className="card__type" style={{backgroundColor: typeColors[type.type.name]}}>
                                {type.type.name}
                            </div>
                        )
                    })
                }
            </div>
            <div className="card__info">
                <div className="card__data card__data--weight">
                    <p className="title">Weight:</p>
                    <p>{pokemon.weight}</p>
                </div>
                <div className="card__data card__data--height">
                    <p className="title">Height:</p>
                    <p>{pokemon.height}</p>
                </div>
                <div className="card__data card__data--ability">
                    <p className="title">Abilities:</p>
                    {/* {console.log(pokemon.abilities)} Temporary for dev puprose */}
                    {pokemon.abilities.map((ability, i) => <p key={i}>{ability.ability.name}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Card;