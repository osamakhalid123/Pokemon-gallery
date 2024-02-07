export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokemonDetails {
    abilites: any[];
    base_experience: number;
    forms: any[];
    game_indices: any[];
    held_items: any[];
    height: number;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: any[];
    name: string;
    order: number;
    past_abilities: any[];
    past_types: any[];
    species: any[];
    sprites: any[];
    stats: any[];
    weight: number;
    types:PokemonDetailsTypes[]
  }
  

  export interface PokemonDetailsTypes {
    slot:number;
    type:{
        name:string;
        url:string
    }
  }

 export interface PokemonContextType {
    pokeData: PokemonDetails[];
    loading: boolean;
    pokemonList: Pokemon[];
    url: string;
    nextUrl?: string;
    prevUrl?: string;
    pokeDex?: PokemonDetails | null;
    setUrl: (url: string) => void;
    setPokeId: React.Dispatch<React.SetStateAction<number>>;
    pokeDetails: PokemonDetails | null;
    pokeId: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setNextUrl: (nextUrl: string | undefined) => void;
    setPrevUrl: (prevUrl: string | undefined) => void;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    filteredPokemonList: Pokemon[];
  }