import React, {useEffect, useState} from 'react';
import styles from '../stylesheets/Pokecard.module.css';

function Pokecard(props) {
  const api = props.api
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [id, setId] = useState(0);

  useEffect(() =>{
    fetch(api)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setIsLoaded(true);
          setName(result.name);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  })
  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className={styles.loading}> Loading... </div>
    )
  } else {
    return (
      <div className={styles.pokecard}>
        {name}
      </div>
    )
  }
};

export default Pokecard;