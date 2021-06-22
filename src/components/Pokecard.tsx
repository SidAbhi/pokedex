import {useEffect, useState} from 'react';
import styles from '../stylesheets/Pokecard.module.css';
import { useGetPokemonByIdQuery, useGetPokemonSpeciesQuery } from '../features/pokeSlice';

function Pokecard(props: any) {
  const id = props.api.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/','');
  const pokemonApi = useGetPokemonByIdQuery(id);
  const speciesApi = useGetPokemonSpeciesQuery(id);
  const [pokemon, setPokemon] = useState<any>(emptyPoke);

  useEffect(() =>{
    if (pokemonApi.isSuccess && speciesApi.isSuccess) {
      const data = pokemonApi.data;
      const speciesData = speciesApi.data;

      const checkAbility = () =>{
        if (data.abilities.length > 1 && !data.abilities[1].is_hidden) {
          return {
            name: data.abilities[1].ability.name,
            id: data.abilities[1].ability.url.replace('https://pokeapi.co/api/v2/ability/','').replace('/','')
          } 
        } else { return {
          name: '',
          id: ''
        } }
      };

      const checkHiddenAbility = () =>{
        if (data.abilities.length > 1 && !data.abilities[1].is_hidden) {
          return {
            name: data.abilities[1].ability.name,
            id: data.abilities[1].ability.url.replace('https://pokeapi.co/api/v2/ability/','').replace('/','')
          } 
        } else { return {
          name: '',
          id: ''
        } }
      };

      setPokemon({
        id: data.id,
        name: data.name,
        primaryType: data.types[0].type.name,
        secondaryType: (data.types.length === 2) ? data.types[1].type.name : '',
        firstAbility: {
          name: data.abilities[0].ability.name,
          id: data.abilities[0].ability.url.replace('https://pokeapi.co/api/v2/ability/','').replace('/','')
        },
        secondAbility: checkAbility(),
        hiddenAbility: checkHiddenAbility(),
        color: colorSwitch(speciesData.color.name),
        typeColor: typeColorSwitch(data.types[0].type.name),
        sprites: {
          spriteM: data.sprites.front_default,
          spriteMShiny: data.sprites.front_shiny,
          spriteF: data.sprites.front_female,
          spriteFShiny: data.sprites.front_female_shiny,
          hqArt: 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/imagesHQ/' + id.toString().padStart(3, '0') + '.png',
          hqArtCompressed: 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' + id.toString().padStart(3, '0') + '.png',
          hqArtThumbnail: 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails/' + id.toString().padStart(3, '0') + '.png',
          hqArtThumbnailCompressed: 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/' + id.toString().padStart(3, '0') + '.png',
        }
      })
    }
  }, [pokemonApi.isSuccess, pokemonApi.data, speciesApi.isSuccess, speciesApi.data, id])

  if (pokemonApi.isError || speciesApi.isError) {

    return <div className={styles.error}>Error: {pokemonApi.error}</div>;

  } if (pokemonApi.isLoading || speciesApi.isLoading) {

    return (
      <div className={styles.loading}> Loading... </div>
    )

  } else if (pokemonApi.isSuccess && speciesApi.isSuccess) {

    return (
      <div className={styles.pokecard} style={{backgroundColor: pokemon.typeColor.default}}>
        <div className={styles.botBox} style={{outlineColor: pokemon.typeColor.dark}}></div>
        <img src={pokemon.sprites.hqArtCompressed} alt={pokemon.name} className={styles.img}></img>
        <div className={styles.id}>{pokemon.id}</div>
        <div className={styles.name}>{pokemon.name}</div>
        {pokemon.primaryType}-
        {pokemon.secondaryType}-
      </div>
    )

  } else {

    return (<div>Something went wrong</div>)

  }
};

const emptyPoke = {
  id: 0,
  name: '',
  primaryType: '',
  secondaryType: '',
  firstAbility: {
    name: '',
    id: ''
  },
  secondAbility: {
    name: '',
    id: ''
  },
  hiddenAbility: {
    name: '',
    id: ''
  },
  color: '',
  typeColor: {
    default: '',
    dark: '',
    light: ''
  },
  sprites: {
    spriteM: '',
    spriteMShiny: '',
    spriteF: '',
    spriteFShiny: '',
    hqArt: '',
    hqArtCompressed: '',
    hqArtThumbnail: '',
    hqArtThumbnailCompressed: '',
  }
}

const colorAlt = {
  black: '#232938',
  white: '#FAF5FA',
  gray: '#878287',
  brown: '#B54624',
  red: '#D4352C',
  green: '#13A82C',
  blue: '#25B3E8',
  yellow: '#FFD336',
  pink: '#FCA4BD',
  purple: '#A36AE6'
}

const typeColor = {
	normal: {
    default: '#A8A77A',
    dark: '#6D6D4E',
    light: '#C6C6A7'
  },
	fire: {
    default: '#EE8130',
    dark: '#9C531F',
    light: '#F5AC78'
  },
	water: {
    default: '#6390F0',
    dark: '#445E9C',
    light: '#9DB7F5'
  },
	electric: {
    default: '#F7D02C',
    dark: '#A1871F',
    light: '#FAE078'
  },
	grass: {
    default: '#7AC74C',
    dark: '#4E8234',
    light: '#A7DB8D'
  },
	ice: {
    default: '#96D9D6',
    dark: '#638D8D',
    light: '#BCE6E6'
  },
	fighting: {
    default: '#C22E28',
    dark: '#7D1F1A',
    light: '#D67873'
  },
	poison: {
    default: '#A33EA1',
    dark: '#682A68',
    light: '#C183C1'
  },
	ground: {
    default: '#E2BF65',
    dark: '#927D44',
    light: '#EBD69D'
  },
	flying: {
    default: '#A98FF3',
    dark: '#6D5E9C',
    light: '#C6B7F5'
  },
	psychic: {
    default: '#F95587',
    dark: '#A13959',
    light: '#FA92B2'
  },
	bug: {
    default: '#A6B91A',
    dark: '#6D7815',
    light: '#C6D16E'
  },
	rock: {
    default: '#B6A136',
    dark: '#786824',
    light: '#D1C17D'
  },
	ghost: {
    default: '#735797',
    dark: '#493963',
    light: '#A292BC'
  },
	dragon: {
    default: '#6F35FC',
    dark: '#4924A1',
    light: '#A27DFA'
  },
	dark: {
    default: '#705746',
    dark: '#49392F',
    light: '#A29288'
  },
	steel: {
    default: '#B7B7CE',
    dark: '#787887',
    light: '#D1D1E0'
  },
	fairy: {
    default: '#D685AD',
    dark: '#9B6470',
    light: '#F4BDC9'
  },
};

type Color = 'black' | 'white' | 'gray' | 'brown' | 'red' | 'green' | 'blue' | 'yellow' | 'pink' | 'purple';
type PokeType = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'

const colorSwitch = (color: Color) => {
  return colorAlt[color] || ''
}

const typeColorSwitch = (pokeType: PokeType) => {
  return typeColor[pokeType] || {default: 'white', dark: 'gray', light: 'white'}
}

export default Pokecard;