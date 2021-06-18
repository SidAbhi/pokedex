import React, {useEffect, useState} from 'react';
import styles from '../stylesheets/Pokecard.module.css';
import { useGetPokemonByIdQuery, useGetPokemonSpeciesQuery } from '../features/pokeListSlice';

function Pokecard(props: any) {
  const id = props.api.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/','');
  const pokemon = useGetPokemonByIdQuery(id);
  const species = useGetPokemonSpeciesQuery(id);
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSpeciesLoaded, setIsSpeciesLoaded] = useState(false);
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [primaryType, setPrimaryType] = useState('');
  const [secondaryType, setSecondaryType] = useState('');
  const [firstAbility, setFirstAbility] = useState('');
  const [secondAbility, setSecondAbility] = useState('');
  const [hiddenAbility, setHiddenAbility] = useState('');
  const [pokeColor, setPokeColor] = useState('');

  console.log(pokemon)
  console.log(species)

  useEffect(() =>{
  })

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className={styles.loading}> Loading... </div>
    )
  } else {
    return (
      <div className={styles.pokecard} style={{backgroundColor: pokeColor}}>
        <img src={thumbnail} alt={name}></img>
        {name}-
        {id}-
        {primaryType}-
        {secondaryType}-
        {firstAbility}-
        {secondAbility}-
        {hiddenAbility}
      </div>
    )
  }
};

export default Pokecard;