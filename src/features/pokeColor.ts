const colorAlt = {
  black: '#232938',
  white: '#FAF5FA',
  gray: '#878287',
  brown: '#B54624',
  red: '#D4352C',
  green: '#13A82C',
  blue: '#25B3E8',
  yellow: '#FFD336',
  pink: '#FCA4BD',
  purple: '#A36AE6'
}

const typeColor = {
	normal: {
    default: '#A8A77A',
    dark: '#6D6D4E',
    light: '#C6C6A7'
  },
	fire: {
    default: '#EE8130',
    dark: '#9C531F',
    light: '#F5AC78'
  },
	water: {
    default: '#6390F0',
    dark: '#445E9C',
    light: '#9DB7F5'
  },
	electric: {
    default: '#F7D02C',
    dark: '#A1871F',
    light: '#FAE078'
  },
	grass: {
    default: '#7AC74C',
    dark: '#4E8234',
    light: '#A7DB8D'
  },
	ice: {
    default: '#96D9D6',
    dark: '#638D8D',
    light: '#BCE6E6'
  },
	fighting: {
    default: '#C22E28',
    dark: '#7D1F1A',
    light: '#D67873'
  },
	poison: {
    default: '#A33EA1',
    dark: '#682A68',
    light: '#C183C1'
  },
	ground: {
    default: '#E2BF65',
    dark: '#927D44',
    light: '#EBD69D'
  },
	flying: {
    default: '#A98FF3',
    dark: '#6D5E9C',
    light: '#C6B7F5'
  },
	psychic: {
    default: '#F95587',
    dark: '#A13959',
    light: '#FA92B2'
  },
	bug: {
    default: '#A6B91A',
    dark: '#6D7815',
    light: '#C6D16E'
  },
	rock: {
    default: '#B6A136',
    dark: '#786824',
    light: '#D1C17D'
  },
	ghost: {
    default: '#735797',
    dark: '#493963',
    light: '#A292BC'
  },
	dragon: {
    default: '#6F35FC',
    dark: '#4924A1',
    light: '#A27DFA'
  },
	dark: {
    default: '#705746',
    dark: '#49392F',
    light: '#A29288'
  },
	steel: {
    default: '#B7B7CE',
    dark: '#787887',
    light: '#D1D1E0'
  },
	fairy: {
    default: '#D685AD',
    dark: '#9B6470',
    light: '#F4BDC9'
  },
};

type Color = 'black' | 'white' | 'gray' | 'brown' | 'red' | 'green' | 'blue' | 'yellow' | 'pink' | 'purple';
type PokeType = 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy'

export const colorSwitch = (color: Color) => {
  return colorAlt[color] || ''
}

export const typeColorSwitch = (pokeType: PokeType) => {
  return typeColor[pokeType] || {default: 'white', dark: 'gray', light: 'white'}
}
