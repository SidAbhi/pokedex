import {useEffect, useState, useRef} from 'react';
import styles from '../stylesheets/Pokepage.module.css';
import { useGetPokemonByIdQuery, useGetPokemonSpeciesQuery } from '../features/pokeSlice';
import { useSpring, animated } from 'react-spring';
import { useParams, Link } from 'react-router-dom'

const Pokepage = (props: any) => {
  const params = useParams();
  const id = params.id;

  return (
    <div className={styles.main}>
      <div className={styles.focus}></div>
      <div className={styles.page}>
        <Link to="/pokemon">Back</Link>
      </div>
    </div>
  )
}

export default Pokepage;