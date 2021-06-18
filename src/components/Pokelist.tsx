import React, { useEffect, useState, useReducer } from 'react';
import styles from '../stylesheets/Pokelist.module.css';
import Pokecard from '../components/Pokecard';
import { useDispatch, connect } from 'react-redux';
import { getList } from '../features/pokeListSlice';

const mapStateToProps = (state: any) => {
  return {pokeListAll: state.pokeList}
}

function Pokelist(props:any) {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [list, setList] = useState<any>();
  const dispatch = useDispatch();

  useEffect(() => {
    //If statement to prevent infinite rerenders
    if(props.pokeListAll.status === 'idle') {
      dispatch(getList());
    }

    console.log(props)

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
  }, [dispatch, props])

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

export default connect(mapStateToProps)(Pokelist);
