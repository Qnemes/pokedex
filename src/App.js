import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import './stylesheets/main.scss'

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const pokemonEndpoint = 'https://pokeapi.co/api/v2/pokemon'

  const getPokemons = async (url) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          resolve(data)
        })
    });
  }

  const getPokemon = ({ url }) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          resolve(data)
        })
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      let res = await getPokemons(pokemonEndpoint);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      await loadPokemon(res.results);
      setLoading(false);
    }
    fetchData();
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

  const next = async () => {
    setLoading(true);
    let data = await getPokemons(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const previous = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getPokemons(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(pokemonData);
  }

  return (
    <>
      <Navbar />
      <div>
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
            <div className="navigation">
              <button className="navigation__btn" onClick={previous}>Previous page</button>
              <input className="navigation__input" type="text" placeholder="Enter keywords..." />
              <button className="navigation__btn" onClick={next}>Next page</button>
            </div>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                // console.log(pokemon.id)
                return <Card key={pokemon.id} pokemon={pokemon} />
              })}
            </div>
            <div className="navigation">
              <button className="navigation__btn" onClick={previous}>Previous page</button>
              <button className="navigation__btn" onClick={next}>Next page</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;