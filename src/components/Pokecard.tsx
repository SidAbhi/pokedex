import React, {useEffect, useState} from 'react';
import styles from '../stylesheets/Pokecard.module.css';

function Pokecard(props: any) {
  const api = props.api;
  const speciesApi = props.api.replace('pokemon','pokemon-species');
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSpeciesLoaded, setIsSpeciesLoaded] = useState(false);
  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [id, setId] = useState(0);
  const [primaryType, setPrimaryType] = useState('');
  const [secondaryType, setSecondaryType] = useState('');
  const [firstAbility, setFirstAbility] = useState('');
  const [secondAbility, setSecondAbility] = useState('');
  const [hiddenAbility, setHiddenAbility] = useState('');
  const [pokeColor, setPokeColor] = useState('');

  useEffect(() =>{

    fetch(speciesApi)
      .then(res=>res.json())
      .then(
        (result) => {
          setIsSpeciesLoaded(true);
          setPokeColor(result.color.name);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )

    fetch(api)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          
          setName(result.name);

          const idString:string = result.id.toString()

          setThumbnail('https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/' + idString.padStart(3, '0') + '.png');

          setId(result.id);

          setPrimaryType(result.types[0].type.name);

          if (result.types.length === 2) {
            setSecondaryType(result.types[1].type.name);
          };

          setFirstAbility(result.abilities[0].ability.name);

          if (result.abilities.length > 1 && result.abilities[1].slot === 2) {
            setSecondAbility(result.abilities[1].ability.name);
          };

          if (result.abilities.length > 1 && result.abilities[1].slot === 2) {
            setHiddenAbility(result.abilities[2].ability.name);
          } else if (result.abilities.length > 1 && result.abilities[1].slot === 3) {
            setHiddenAbility(result.abilities[1].ability.name);
          };
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  })

  console.log(name)


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