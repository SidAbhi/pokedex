import React, {useEffect, useState} from 'react';
import styles from '../stylesheets/Pokelist.module.css';
import Pokecard from '../components/Pokecard';

function Pokelist() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [poke, setPoke] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=100&limit=24')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPoke(result.results);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  console.log(poke);

  const list = poke.map(pkmn => {
    return <Pokecard key={pkmn.name} api={pkmn.url}>
      {pkmn.name}
    </Pokecard>
  })

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className={styles.loading}> Loading... </div>
    )
  } else {
    return (
      <div className={styles.list}>
        {list}
      </div>
    )
  }
};

export default Pokelist;
