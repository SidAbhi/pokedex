import React, { useEffect, useState, useRef } from 'react';
import styles from '../stylesheets/Pokelist.module.css';
import Pokecard from '../components/Pokecard';
import { connect } from 'react-redux';
import { useGetPokemonListAllQuery } from '../features/pokeSlice';

const mapStateToProps = (state: any) => {
  return {pokeListAll: state.pokeList}
}

function Pokelist(props:any) {
  const [list, setList] = useState<any>();
  const listAll = useGetPokemonListAllQuery({offset: 0, limit: 9999});
  const [sliceStart, setSliceStart] = useState<number>(0);
  const [sliceEnd, setSliceEnd] = useState<number>(4);
  const searchBar = useRef(null);
  const click = () => {
    setSliceStart(0);
    setSliceEnd(sliceEnd+4);
  }

  useEffect(() => {
    if (listAll.isSuccess) {
      setList(listAll.data.results.slice(sliceStart,sliceEnd).map((pkmn: any) => {
        return <Pokecard key={pkmn.name} api={pkmn.url}/>
      }))
    }
  },[listAll.isSuccess, sliceEnd, sliceStart])

  if (listAll.error) {
    return <div className={styles.error}>Error: {listAll.error}</div>;
  } else if (listAll.isLoading) {
    return (
      <div className={styles.loading}> Loading... </div>
    )
  } else {
    return (
      <div className={styles.main}>
        <input
          className={styles.searchBar}
          ref={searchBar}
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="currently only English pokemon names are supported"
        />
        <div className={styles.list}>
          {list}
        </div>
        <div onClick={click}>test</div>
      </div>
    )
  }
};

export default connect(mapStateToProps)(Pokelist);
