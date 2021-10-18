import {useEffect, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {PokemonFullInfo} from '../interfaces/PokemonInterfaces';

export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFullInfo>(
    {} as PokemonFullInfo,
  );

  const loadPokemonInfo = async () => {
    const resp = await pokemonApi.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemon(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemonInfo();
  }, []);

  return {
    isLoading,
    pokemon,
  };
};
