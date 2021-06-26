import {useEffect, useState, useRef} from 'react';
import styles from '../stylesheets/Pokecard.module.css';
import { useGetPokemonByIdQuery, useGetPokemonSpeciesQuery } from '../features/pokeSlice';
import { useSpring, animated } from 'react-spring';
import { useHover } from 'react-use-gesture';
import {Link} from 'react-router-dom';

function Pokecard(props: any) {
  const id = props.api.replace('https://pokeapi.co/api/v2/pokemon-species/','').replace('/','');
  const pokemonApi = useGetPokemonByIdQuery(id);
  const speciesApi = useGetPokemonSpeciesQuery(id);
  const [pokemon, setPokemon] = useState<any>(emptyPoke);
  const imgRef = useRef(null);
  const [imgLoad, setImgLoad] = useState<number>(0)
  const pokeLink = `/pokemon/${id}`

  console.log(imgLoad)

  const [hoverSpring, hoverApi] = useSpring(() => ({
    from: {
      transform: 'scale(1, 1)'
    }
  }));

  const [imgHoverSpring, imgHoverApi] = useSpring(() => ({
    from: {
      transform: 'scale(1, 1) translate(-50%, -65%)'
    }
  }));

  const hover = useHover(event => {
    const val = event.hovering ? 'scale(1.02, 1.02)' : 'scale(1, 1)';
    const valImg = event.hovering ? 'scale(1.12, 1.12) translate(-44%, -65%)' : 'scale(1, 1) translate(-50%, -65%)';

    hoverApi.start({
      transform: val
    });
    imgHoverApi.start({
      transform: valImg
    });
  })

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
        name: speciesData.name,
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
          hqArt: data.sprites.other["official-artwork"].front_default,
        }
      })
    }
  }, [pokemonApi.isSuccess, pokemonApi.data, speciesApi.isSuccess, speciesApi.data, id])

  if (pokemonApi.isError || speciesApi.isError) {

    return <div className={styles.error}>Error: {pokemonApi.error}</div>;

  } if (pokemonApi.isLoading || speciesApi.isLoading) {

    return (
      <div className={styles.loading}>
        <div className={styles.botBoxLoading} style={{outlineColor: '#423a3a'}}></div>
      </div>
    )

  } else if (pokemonApi.isSuccess && speciesApi.isSuccess) {

    return (
      <Link to={pokeLink}>
        <div {...hover()} 
          className={styles.pokecardContainer}
          style={{
            position: 'relative'
          }}
        >
          <animated.div 
            className={styles.pokecard} 
            style={{
              backgroundColor: pokemon.typeColor.default,
              transform: hoverSpring.transform
            }}
          >
            <div className={styles.accentBox} style={{backgroundColor: pokemon.typeColor.dark}}></div>
            <div className={styles.botBox}></div>
            <div className={styles.id}>{pokemon.id}</div>
            <div className={styles.name}>{pokemon.name}</div>
          </animated.div>
          <animated.img 
            ref={imgRef}
            onLoad={()=>setImgLoad(1)}
            src={pokemon.sprites.hqArt} 
            alt={pokemon.name} 
            className={styles.img}
            style={{
              transform: imgHoverSpring.transform,
              opacity: imgLoad
            }}/>
        </div>
      </Link>
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