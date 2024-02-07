import React from 'react';
import styles from './pokemonList.module.css';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Pokemon, PokemonDetails } from '../../../PokemonContext/types';



interface PokemonListProps {
    pokeData: PokemonDetails[] ;
    pokemonList: Pokemon[];
    prevUrl: string |undefined;
    nextUrl: string |undefined;
    setCurrentPage: any;
}

const PokemonTypes: React.FC<any> = ({ types }) => (
    <>
        {types?.map((type: any, index: any) => (
            <p key={`${type?.type?.name}+ ${index}`}>{type?.type?.name}</p>
        ))}
    </>
);

const PokemonList: React.FC<PokemonListProps> = ({ pokeData, pokemonList, prevUrl, setCurrentPage, nextUrl }) => {
    const handleNextPage = () => {
        if (nextUrl) {
            setCurrentPage((prev: any) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (prevUrl) {
            setCurrentPage((prev: any) => prev - 1);
        }
    };

    return (
        <div className={styles.pokemonContainer}>
            <div className={styles.pokemonCardsContainer}>

                <Container>
                    <Row>
                        {pokemonList[0] ? pokemonList?.map((pokemon, index) => {
                            const pokemonNumber = pokemon.url ? parseInt(pokemon.url.split('/').slice(-2, -1)[0]) : null;
                            return (
                                <Col lg={4} md={6} xs={12}>
                                    <Link to={`/pokemon/${pokemonNumber}`} key={pokemonNumber} className={styles.pokemonCardLink}>
                                        <div className={styles.pokemonCard}>
                                            <div className={styles.pokemonImg}>
                                                <img
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonNumber}.png`}
                                                    alt={pokemon.name}
                                                    width={"70%"}
                                                />
                                            </div>
                                            <div className={styles.pokemonDetailsContianer}>
                                                <div className={styles.pokemonName}>
                                                    <p>{pokemon.name}</p>
                                                </div>
                                                <div className={styles.pokemonAbilities}>
                                                    {pokeData &&
                                                        pokeData[index]?.types && (
                                                            <PokemonTypes types={pokeData[index].types} />
                                                        )}
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                </Col>

                            );
                        })
                            :
                            <div className={styles.noResults}>
                                <h3>

                                    No pokemons Found
                                </h3>
                            </div>
                        }
                    </Row>

                </Container>

            </div>
            <div className={styles.paginationContainer}>
                <button className={styles.prevButton} onClick={handlePrevPage} disabled={!prevUrl}>
                    Previous Page
                </button>
                <button className={styles.nextButton} onClick={handleNextPage} disabled={!nextUrl}>
                    Next Page
                </button>
            </div>
        </div>
    );
};

export default PokemonList;
