type Pokemon = {
  id: number,
  name: string,
  abilities: {
    name: string,
    url: string,
    isHidden: boolean,
    slot: number
  }[],
  sprites: {
    frontM: string,
    frontMShiny: string,
    frontF: string | null | undefined,
    frontFShiny: string | null | undefined,
    hqArt: string,
    hqArtCompressed: string,
    hqArtThumbnail: string,
    hqArtThumbnailCompressed: string,
  },
  stats: {
    hp: number,
    atk: number,
    def: number,
    spa: number,
    spd: number,
    spe: number,
  },
  primaryType: string,
  secondaryType: string,
  weight: number
}

export default Pokemon;