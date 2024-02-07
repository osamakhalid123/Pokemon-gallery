import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './componants/Header'
import PokemonList from './componants/Header/PokemonList'
import { usePokemonContext } from './PokemonContext/PokemonContext';
import axios from 'axios';
import PokemonDetails from './componants/PokemonDetails';

function App() {
  const { setSearchQuery,pokeData, url, nextUrl, prevUrl ,setNextUrl, setPrevUrl,setCurrentPage ,pokeDetails,setPokeId,filteredPokemonList } = usePokemonContext();

  useEffect(() => {
    const pokeFun = async () => {
      const res = await axios.get<{ next: string | null, previous: string | null }>(url);
      setNextUrl(res.data.next || undefined);
      setPrevUrl(res.data.previous || undefined);
    };
    pokeFun();
  }, [url, setNextUrl, setPrevUrl]);



  return (
    <Router>
      <Header setSearchQuery={setSearchQuery}/>
      <Routes>
        <Route path="/" element={<PokemonList pokemonList={filteredPokemonList} pokeData={pokeData} nextUrl={nextUrl} prevUrl={prevUrl} setCurrentPage={setCurrentPage}/>} /> 
        <Route path="pokemon/:pokemonId" element={<PokemonDetails setPokeId={setPokeId} pokeDetails={pokeDetails}/>} />
      </Routes>
    </Router>
  )
}

export default App;
