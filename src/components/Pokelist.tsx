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
  const listGet = useGetPokemonListAllQuery({offset: 0, limit: 9999});
  const [filteredPoke, setFilteredPoke] = useState<any>([]);
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  const [listAll, setListAll] = useState<any>([]);
  const [sliceStart, setSliceStart] = useState<number>(0);
  const [sliceEnd, setSliceEnd] = useState<number>(4);
  const searchBar = useRef(null)

  const search = (e: any) => {
    const searchString: string = e.target.value.toLowerCase();
    const checkStatus = (searchString.length>2) ? true : false

    const filter = listAll.filter((poke:any) => {
      return (poke.name.includes(searchString))
    });

    setSliceStart(0);
    setSliceEnd(4);
    setFilteredPoke(filter);
    setSearchStatus(checkStatus);
  }

  const click = () => {
    setSliceStart(0);
    setSliceEnd(sliceEnd+4);
  }

  useEffect(() => {
    if (listGet.isSuccess) {
      setListAll(listGet.data.results);

      if(searchStatus) {
        setList(filteredPoke.slice(sliceStart,sliceEnd).map((pkmn: any) => {
          return <Pokecard key={pkmn.name} api={pkmn.url}/>
        }));
      } else if (!searchStatus) {
        setList(listAll.slice(sliceStart,sliceEnd).map((pkmn: any) => {
          return <Pokecard key={pkmn.name} api={pkmn.url}/>
        }));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[listGet.isSuccess, sliceEnd, sliceStart, listAll, searchStatus, filteredPoke])

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
          onKeyUp={search}
          className={styles.searchBar}
          ref={searchBar}
          type="text"
          name="searchBar"
          id="searchBar"
          placeholder="Search by name(English)"
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
