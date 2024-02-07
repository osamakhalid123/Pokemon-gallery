import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import styles from './PokemonDetails.module.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row } from 'react-bootstrap';

const PokemonDetails: React.FC<any> = ({ setPokeId, pokeDetails }) => {

    const { pokemonId } = useParams();


    useEffect(() => {
        setPokeId(pokemonId)
    }, [pokemonId])

    return (
        <Container className={styles.pokemonDetailsContainer}>
            <Row>
            <div className={styles.backLink}>

                <Link to="/">Back</Link>
            </div>

            <div className={styles.pokemonDetails}>
                <div className={styles.topSection}>
                    <img src={pokeDetails?.sprites?.front_default} width={200} />
                    <div>
                        <h1>{pokeDetails?.name}</h1>
                        <div className={styles.pokeTypes}>


                            {
                                pokeDetails?.types?.map((types: any) => <p>{types?.type?.name}</p>)
                            }
                        </div>
                    </div>

                </div>
                <div>
                    <Tabs
                        defaultActiveKey="STATS"
                        id="detailsTabs"
                        className={styles.tapsContainer}
                    >
                        <Tab eventKey="STATS" className={styles.tap} title="STATS">
                            <div className={styles.statsContianer}>
                                {
                                    pokeDetails?.stats?.map((stats: any) => {
                                        return (
                                            <div className={styles.stats} key={stats?.stat?.name}>
                                                <div className={styles.statsName}>

                                                    <p>{stats?.stat?.name}</p>
                                                </div>

                                                <p>{stats?.base_stat}</p>
                                            </div>
                                        )

                                    }

                                    )

                                }
                            </div>
                        </Tab>
                        <Tab eventKey="MOVES" title="MOVES">
                            <div >
                                {
                                    pokeDetails?.moves?.map((moves: any) => {
                                        return (
                                            <>
                                                <p>{moves?.move?.name}</p>
                                            </>
                                        )

                                    }

                                    )

                                }
                            </div>
                        </Tab>
                        <Tab eventKey="ABILITIES" title="ABILITIES">
                            <div>
                                {
                                    pokeDetails?.abilities?.map((abilities: any) => {
                                        return (
                                            <>
                                                <p>{abilities?.ability?.name}</p>
                                            </>
                                        )

                                    }

                                    )

                                }
                            </div>
                        </Tab>
                    </Tabs>
                </div>

            </div>
            </Row>
        </Container>
    )
}

export default PokemonDetails