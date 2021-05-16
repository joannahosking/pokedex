import React from 'react';
import axios from 'axios';
import { ColorExtractor } from 'react-color-extractor';
import './app.css';
import { ReactComponent as Gameboy } from './gameboy.svg';
import { ReactComponent as Pokeball } from './pokeball.svg';
import { ReactComponent as Abra } from './abra.svg';

const App = () => {
  const [pokemon, setPokemon] = React.useState();
  const [counter, setCounter] = React.useState(1);
  const [primaryColor, setPrimaryColor] = React.useState();
  const uri = 'https://pokeapi.co/api/v2/pokemon/';
  const totalPokemon = 151;

  const dropdownOptions = [];
  for (let i = 1; i < totalPokemon; i++) {
    dropdownOptions.push(i);
  }

  const getPokemon = async () => {
    try {
      const res = await axios.get(uri + counter);
      setPokemon(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const updatePokemon = async (increment) => {
    setCounter(pokemon.id + increment);
  }

  const handleDropdown = e => {
    if (e.target.value !== 'null' && e.target.value !== counter) {
      setCounter(e.target.value);
    }
  }

  const Header = () => {
    return (
      <div className="header">
        <div className="logo">
          <Pokeball /> <h1>Pokédex</h1>
        </div>
        <div className="jumpto">
          <label htmlFor="jump">JUMP TO: </label>
          <select name="jump" id="jump" onChange={e => handleDropdown(e)}>
            <option value="null">--</option>
            {dropdownOptions.map((opt, key) => {
              return (
                <option key={key} value={opt}>
                  {(String(opt).length < 3) ? ((String(opt).length < 2) ? '00' + String(opt) : '0' + String(opt)) : opt}
                </option>
              )
            })}
          </select>
        </div>
      </div>
    )
  }

  const Footer = () => {
    return (
      <div className="footer">
        Built by <a href="https://joannahosking.com/" target="_blank" rel="noreferrer">Joanna Hosking</a> <Abra />
      </div>
    )
  }

  const PokemonDetails = () => {
    if (pokemon) {
      return (
        <div className="pokewrapper">
          <div className="headline">
            <span className="number">#{pokemon.id}</span>
            <span className="name">{pokemon.name}</span>
            <ColorExtractor getColors={colors => setPrimaryColor(colors[1])}>
              <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} className="sprite" />
            </ColorExtractor>
          </div>
          <div className="pokemeta">
            <ul>
              {pokemon.types.map((type, key) => {
                return (
                <li key={key}>
                  <img src={`/assets/icons/${type.type.name}.png`} alt={type.type.name} />
                </li>
                )
              })}
            </ul>
            <p className="details">Height: {pokemon.height}m</p>
            <p className="details">Weight: {pokemon.weight}kg</p>
            <span className="stat">HP: {pokemon.stats[0].base_stat}</span>
            <span className="stat">Attack: {pokemon.stats[1].base_stat}</span><br />
            <span className="stat">Defense: {pokemon.stats[2].base_stat}</span>
            <span className="stat">Speed: {pokemon.stats[5].base_stat}</span>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          Loading stats...
        </div>
      )
    }
  }

  React.useEffect(() => {
    getPokemon();
  }, [counter]);

  return (
    <div className="container">
      <Header />
      <div className="overlay" style={{backgroundColor: primaryColor}}><Gameboy /></div>
      <div className="nav">
        {counter > 1 && 
          <button onClick={() => updatePokemon(-1)}>&#60;</button>
        }
      </div>
      <PokemonDetails />
      <div className="nav">
        {counter < 151 &&
          <button onClick={() => updatePokemon(1)}>&#62;</button>
        }
      </div>
      <Footer />
    </div>
  )
}

export default App;
