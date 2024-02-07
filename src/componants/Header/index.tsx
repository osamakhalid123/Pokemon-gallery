
import styles from "./header.module.css"

import logo from '../../../public/Images/pokeapi.png'
import { Link } from "react-router-dom";


interface headerProps{
  setSearchQuery:React.Dispatch<React.SetStateAction<string>>
}

const Header: React.FC<headerProps>=({setSearchQuery})=> {


  const handleInputChange = (event:any) => {
    setSearchQuery(event.target.value)
  };
  return (


    <div className={styles.headerContainer}>
      <div className={styles.leftSide}>
        <Link to="/" className="Logo">
          <img src={logo} alt="pokeApi" width={200} height={100} />
        </Link>
        <div className={styles.PokemonGallery}>
          <h4>PokemonGallery</h4>
        </div>
      </div>

      <div className={styles.SearchInput}>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleInputChange}
        />      </div>

    </div>
  )
}

export default Header