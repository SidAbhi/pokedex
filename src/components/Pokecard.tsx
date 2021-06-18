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
      <div className={styles.pokecard} style={{backgroundColor: pokemon.color}}>
        <img src={pokemon.sprites.hqArtThumbnailCompressed} alt={pokemon.name}></img>
        {pokemon.name}-
        {pokemon.id}-
        {pokemon.primaryType}-
        {pokemon.secondaryType}-
        {pokemon.firstAbility.name}-
        {pokemon.secondAbility.name}-
        {pokemon.hiddenAbility.name}
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
  red: '#FF4036',
  green: '#25E87D',
  blue: '#25B3E8',
  yellow: '#FFD336',
  pink: '#FCA4BD',
  purple: '#A36AE6'
}

type Color = 'black' | 'white' | 'gray' | 'brown' | 'red' | 'green' | 'blue' | 'yellow' | 'pink' | 'purple';

const colorSwitch = (color: Color) => {
  return colorAlt[color] || ''
}

export default Pokecard;