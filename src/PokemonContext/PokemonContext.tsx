import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Pokemon, PokemonContextType, PokemonDetails } from './types';



const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};

export const PokemonProvider: React.FC<any> = ({ children }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [pokeData, setPokeData] = useState<PokemonDetails[]>([]);
  const [pokeDetails, setPokeDetails] = useState<PokemonDetails | null>(null);
  const [pokeId, setPokeId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/?limit=6");
  const [nextUrl, setNextUrl] = useState<string | undefined>();
  const [prevUrl, setPrevUrl] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);

  const getPokemon = async (res: Pokemon[]) => {
    const pokemonData = await Promise.all(res.map(async (item) => {
      const result = await axios.get<PokemonDetails>(item.url);
      return result.data;
    }));
    setPokeData(pokemonData);
  };

  const pokeFun = async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ next: string | null, previous: string | null, results: Pokemon[] }>(url);
   
      setPokemonList(res?.data.results || []);
      setFilteredPokemonList(res?.data.results || []);
      await getPokemon(res.data.results);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    pokeFun();
  }, [url]);


  const searchPokemon = async (searchQuery: string) => {
    try {
      const filteredPokemonList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setFilteredPokemonList(filteredPokemonList);
    } catch (error) {
      console.error('Error searching Pokemon:', error);
    }
  }

  const paginate = async (page: number) => {
    try {
      const response = await axios.get<any>(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 6}&limit=6`);
      setPokemonList(response.data.results)
      setNextUrl(response.data?.next || undefined);
      setPrevUrl(response.data?.previous || undefined);
      setFilteredPokemonList(response.data.results || []);
    } catch (error) {
      console.error('Error paginating Pokemon:', error);
    }
  };

  const pokemonDetails = async (id: number) => {
    try {
      const response = await axios.get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      setPokeDetails(response?.data);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  useEffect(() => {
    paginate(currentPage);
  }, [currentPage]);

  useEffect(() => {
    searchPokemon(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (pokeId !== 0) {
      pokemonDetails(pokeId);
    }
  }, [pokeId]);

  const value: PokemonContextType = {
    pokeData,
    loading,
    url,
    nextUrl,
    prevUrl,
    setUrl,
    setNextUrl,
    setPrevUrl,
    pokemonList,
    setPokeId,
    pokeId,
    pokeDetails,
    setCurrentPage,
    setSearchQuery,
    filteredPokemonList
  };

  return (
    <PokemonContext.Provider value={value}>
      {children}
    </PokemonContext.Provider>
  );
};
