import {useEffect, useState} from 'react';
import styles from '../stylesheets/Pokepage.module.css';
import { useGetPokemonByIdQuery, useGetPokemonSpeciesQuery } from '../features/pokeSlice';
import { useSpring, animated } from 'react-spring';
import { useParams, Link } from 'react-router-dom';
import { colorSwitch, typeColorSwitch} from '../features/pokeColor'

const Pokepage = (props: any) => {
  const params = useParams();
  const id = params.id;
  const pokemonApi = useGetPokemonByIdQuery(id);
  const speciesApi = useGetPokemonSpeciesQuery(id);
  const [pokemon, setPokemon] = useState<any>(emptyPoke);

  const enterAnim = useSpring({
    from: {
      opacity: 0,
      height: 'scale(1, 0)'
    },
    to: {
      opacity: 0.85,
      height: 'scale(1, 1)'
    }
  });

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

      const checkSecondaryType = (data.types.length === 2) ? data.types[1].type.name : ''

      setPokemon({
        id: data.id,
        name: speciesData.name,
        primaryType: data.types[0].type.name,
        secondaryType: checkSecondaryType,
        firstAbility: {
          name: data.abilities[0].ability.name,
          id: data.abilities[0].ability.url.replace('https://pokeapi.co/api/v2/ability/','').replace('/','')
        },
        secondAbility: checkAbility(),
        hiddenAbility: checkHiddenAbility(),
        color: colorSwitch(speciesData.color.name),
        typeColor: typeColorSwitch(data.types[0].type.name),
        secondaryTypeColor: typeColorSwitch(checkSecondaryType),
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

  return (
    <div className={styles.main}>
      <Link to="/pokemon">
        <animated.div className={styles.focus} style={{opacity: enterAnim.opacity}}></animated.div>
      </Link>
      <animated.div className={styles.page} style={{transform: enterAnim.height}}>
        <div className={styles.close}><Link to="/pokemon">Back</Link></div>
        <div className={styles.id}>{pokemon.id}</div>
        <div className={styles.name}>{pokemon.name}</div>
        <img src={pokemon.sprites.hqArt} alt={pokemon.name}/>
      </animated.div>
    </div>
  )
}

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

export default Pokepage;