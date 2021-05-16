import React from 'react';
import axios from 'axios';
import { ColorExtractor } from 'react-color-extractor';

const App = () => {
  const [pokemon, setPokemon] = React.useState();
  const [counter, setCounter] = React.useState(1);
  const [primaryColor, setPrimaryColor] = React.useState();
  const uri = 'https://pokeapi.co/api/v2/pokemon/';

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

  const PokemonDetails = () => {
    if (pokemon) {
      return (
        <div>
          <ColorExtractor getColors={colors => setPrimaryColor(colors[1])}>
            <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
          </ColorExtractor>
          <p>#{pokemon.id}</p>
          <p>{pokemon.name}</p>
          <ul>
            {pokemon.types.map((type, key) => {
              return (
              <li key={key}>
                <img src={`/assets/icons/${type.type.name}.png`} alt={type.type.name} />
              </li>
              )
            })}
          </ul>
          <p>HP: {pokemon.stats[0].base_stat}</p>
          <p>Attack: {pokemon.stats[1].base_stat}</p>
          <p>Defense: {pokemon.stats[2].base_stat}</p>
          <p>Speed: {pokemon.stats[5].base_stat}</p>
        </div>
      )
    } else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  }

  React.useEffect(() => {
    getPokemon();
  }, [counter]);

  return (
    <div>
      <div className="overlay" style={{backgroundColor: primaryColor}}>test</div>
      {counter > 1 && 
        <button onClick={() => updatePokemon(-1)}>prev</button>
      }
      <PokemonDetails />
      {counter < 151 &&
        <button onClick={() => updatePokemon(1)}>next</button>
      }
    </div>
  )
}

export default App;
