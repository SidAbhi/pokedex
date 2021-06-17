import React, {useEffect, useState} from 'react';
import styles from '../stylesheets/Pokelist.module.css';
import Pokecard from '../components/Pokecard';

function Pokelist() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [list, setList] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=12')
      const data = await response.json();

      setIsLoaded(true);

      setList(data.results.map((pkmn: any) => {
        return <Pokecard key={pkmn.name} api={pkmn.url}/>
      }))
    };

    fetchData()
      .catch(error =>{
        setError(error);
      });

    // fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=12')
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       setIsLoaded(true);
    //       setList(result.results.map((pkmn: any) => {
    //         return <Pokecard key={pkmn.name} api={pkmn.url}/>
    //       }));
    //     },
    //     (error) => {
    //       setIsLoaded(true);
    //       setError(error);
    //     }
    //   )
  }, [])

  console.log('test');

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
