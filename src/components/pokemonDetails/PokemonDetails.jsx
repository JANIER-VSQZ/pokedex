import { useState, useEffect } from 'react';
import { useParams } from "react-router";

import { useNavigate } from "react-router";

import './PokemonDetails.css';

const PokemonDetails = () => {
    const { pokemonId } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState();
    const navigateTo = useNavigate();
    useEffect(
        () => {
            setIsLoading(true);
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
                .then(resp => resp.json())
                .then(data => {
                    setPokemonData(data);
                    setIsLoading(false)
                    setHasError(undefined);
                }).catch((err) => {
                    setHasError("An Error Ocurred while loading Pokemon")
                    setIsLoading(false);
                    setPokemonData(null);
                });
        }
        , [pokemonId, setPokemonData, setIsLoading, setHasError]);
    return (
        <>
            {isLoading && (<div> Loading ...</div>)}


            {pokemonData && (
                <>
                    <section className='contenedor-detalles'>
                        <div className='detalles'>
                            <h1>{pokemonData.name.toUpperCase()}</h1>
                            <div className='pokemon-imagen'>
                                <img src={pokemonData.sprites.front_default} alt="front" />
                                <img src={pokemonData.sprites.back_default} alt="back" />
                            </div>
                            <div className='contenido'>
                                <div className='izquierda'>
                                    <div className='pokemon-tipo'>
                                        <h3>Tipo(s):</h3>
                                        <ul>
                                            {pokemonData.types.map((typeObj, idx) => (
                                                <li key={idx}>{typeObj.type.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='pokemon-habilidades'>
                                        <h3>Habilidades:</h3>
                                        <ul>
                                            {pokemonData.abilities.map((a, idx) => (
                                                <li key={idx}>{a.ability.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className='derecha'>
                                    <div className='pokemon-stats'>
                                        <h3>Estadísticas:</h3>
                                        <ul>
                                            {pokemonData.stats.map((s, idx) => (
                                                <li key={idx}>
                                                    {s.stat.name}: {s.base_stat}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                            <div className='btnRegresar'>
                                <button onClick={() => { navigateTo('/pokelist') }}>Regresar</button>
                            </div>
                        </div>
                    </section>


                </>
            )}
            {hasError && (
                <div>An Error occured while loading Pokemon</div>
            )}

        </>
    )
}

export default PokemonDetails;