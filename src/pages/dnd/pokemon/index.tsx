import { pokemonListAtom, selectedCharacterAtom } from "@/atoms/atoms";
import { Pokemon } from "@/classes/Pokemon";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { convertToPokemonObjects, removePokemonFromSelectedCharacter } from "@/functions/PokemonHelperFunctions";
import PokemonDisplay from "@/components/PokemonDisplay/PokemonDisplay";
import { MdDeleteForever } from "react-icons/md";
import { Character } from "@/classes/Character";

const index = () => {
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useAtom(
    selectedCharacterAtom
  );

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

  useEffect(() => {
    const fetchData = async () => {
      setSelectedCharacter(() => {
        const storedCharacter = localStorage.getItem("selected_character");
        // return storedCharacter ? JSON.parse(storedCharacter) : null;
        if(storedCharacter) {
          const parsedCharacter = JSON.parse(storedCharacter);
          const rehydratedCharacter = new Character(parsedCharacter.name, parsedCharacter.pokemon.map((p:any) => new Pokemon(p)));
          return rehydratedCharacter;
        }
      });
    };

    fetchData();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSelectedPokemon(
      selectedCharacter?.pokemon.find(
        (pokemon) => pokemon.id === event.target.value
      )
    );
  };

  useEffect(() => {
    if (selectedCharacter?.pokemon && !selectedPokemon) {
      setSelectedPokemon(selectedCharacter?.pokemon[0]);
    }
  }, [selectedCharacter]);

  const onDeleteSelectedPokemon = (pokemonId: string) => {
    console.log("Removing Pokemon with ID:", pokemonId);
  
    // Remove from localStorage
    removePokemonFromSelectedCharacter(pokemonId);
  
    // Update selectedCharacter and rehydrate
    const updatedPokemonList = selectedCharacter?.pokemon.filter(
      (p) => p.id !== pokemonId
    );
    const updatedCharacter = new Character(
      selectedCharacter?.name!,
      updatedPokemonList!
    );
  
    // Update atom state
    setSelectedCharacter(updatedCharacter);
  
    // Update selectedPokemon based on the updated list
    if (updatedPokemonList?.length) {
      setSelectedPokemon(updatedPokemonList[0]);
    } else {
      setSelectedPokemon(undefined);
    }
  };
  

  useEffect(() => {
    console.log(selectedPokemon)
  }, [selectedPokemon])

  return (
    <>
      <div className="p-4 flex flex-col items-center gap-y-4 w-full">
        <div className="flex flex-col items-center">
          <h1 className="font-bold">Pokemon Character Sheet {"(DM)"}</h1>
          <p>Selected Character: {selectedCharacter?.name}</p>
          {/* <p>Available Pokemon: {selectedCharacter?.pokemon.length} </p> */}
        </div>

        <div className="">
          {/* Generate Pokemon Button */}
          <button
            className="bg-blue-500 p-3 rounded hover:bg-blue-700"
            onClick={() => router.push("/dnd/pokemon/generator")}
          >
            Generate Pokemon
          </button>
        </div>

        {/* Pokemon Selector */}
        <div className="flex flex-col gap-y-2">
          <h1>Select Pokemon {`(${selectedCharacter?.pokemon.length})`}</h1>
          <div className="flex gap-x-2 items-center">
            <select
              value={selectedPokemon?.id}
              onChange={handleSelectChange}
              className="text-black px-2 py-1 rounded w-full"
            >
              {selectedCharacter?.pokemon.map((pokemon) => (
                <option key={pokemon.id} value={pokemon.id}>
                  {pokemon.name}
                </option>
              ))}
            </select>

            {selectedPokemon && <div className="text-3xl text-red-500 cursor-pointer" onClick={() => onDeleteSelectedPokemon(selectedPokemon?.id!)}><MdDeleteForever /></div>}
          </div>
        </div>

        {selectedPokemon && (
          <div className="w-full h-full">
            <PokemonDisplay selectedPokemon={selectedPokemon} selectedCharacter={selectedCharacter!} setSelectedCharacter={setSelectedCharacter}/>
          </div>
        )}
      </div>
    </>
  );
};

export default index;
