import React, { useEffect, useState } from 'react';
import styles from '../stylesheets/Pokelist.module.css';
import Pokecard from '../components/Pokecard';
import { connect } from 'react-redux';
import { useGetPokemonListAllQuery } from '../features/pokeListSlice';

const mapStateToProps = (state: any) => {
  return {pokeListAll: state.pokeList}
}

function Pokelist(props:any) {
  const [list, setList] = useState<any>();
  const listAll= useGetPokemonListAllQuery(3);


  console.log(listAll)

  useEffect(() => {
    if (listAll.isSuccess) {
      setList(listAll.data.results.map((pkmn: any) => {
        return <Pokecard key={pkmn.name} api={pkmn.url}/>
      }))
    }
  },[listAll.isSuccess])

  if (listAll.error) {
    return <div className={styles.error}>Error: {listAll.error}</div>;
  } else if (listAll.isLoading) {
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
