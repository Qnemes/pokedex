import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Card from './components/Card/Card';
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const pokemonEndpoint = 'https://pokeapi.co/api/v2/pokemon'

async function getPokemons(url) {
  return new Promise((resolve, reject) => {
      fetch(url)
      .then(res => res.json())            
      .then(data => {
        resolve(data)
      })
    });
  }

function getPokemon({ url }) {
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      resolve(data)
    })
  });
}

  useEffect(() => {
    async function fetchData() {
      let res = await getPokemons(pokemonEndpoint)
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      await loadPokemon(res.results);
      setLoading(false);
    }
    fetchData();
  }, [])

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
            <div className="btn">
              <button onClick={previous}>Previous page</button>
              <button onClick={next}>Next page</button>
            </div>
            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className="btn">
              <button onClick={previous}>Previous page</button>
              <button onClick={next}>Next page</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;