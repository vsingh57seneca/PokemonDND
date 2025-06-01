import { characterTableAtom, selectedCharacterAtom, selectedPokemonAtom } from "@/atoms/atoms";
import { Pokemon } from "@/classes/Pokemon";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/router";
import { CharacterTable } from "@/classes/database/CharacterTable";
import toast from "react-hot-toast";

const PokemonSelector = () => {
  const router = useRouter();
  const [characterTable, setCharacterTable] = useAtom(characterTableAtom);
  const [selectedCharacter, setSelectedCharacter] = useAtom(
    selectedCharacterAtom
  );
  const [selectedPokemon, setSelectedPokemon] = useAtom(selectedPokemonAtom);

  const handlePokemonSelect = (id: string) => {
    const foundPokemon = selectedCharacter?.ownedPokemon.find(
      (p) => p.id === id
    );

    if (foundPokemon) {
      setSelectedPokemon(foundPokemon);
    }
  };

  const handleDelete = (pokemonId: string) => {
    const updatedCharacter = characterTable?.deletePokemon(selectedCharacter?.id as string, pokemonId);

    if(updatedCharacter) {
      console.log(updatedCharacter);
      setSelectedCharacter(updatedCharacter);
      setSelectedPokemon(undefined);
      toast.success("Pokemon deleted successfully");
    }
  };
  useEffect(() => {

  }, [characterTable, setSelectedCharacter]);

  return (
    <div className="flex flex-col items-center gap-y-2">
      <h1>Available Pokemon: {selectedCharacter?.ownedPokemon.length}</h1>
      <div className="flex">
        <select
          className="text-black px-2 py-1"
          value={selectedPokemon?.id}
          onChange={(e) => handlePokemonSelect(e.target.value)}
        >
          <option>Select a Pokemon</option>
          {selectedCharacter?.ownedPokemon.map((p) => (
            <option key={p.id} value={p.id}>
              {`${p.name} ${p.given_name && `(${p.given_name})`}`}
            </option>
          ))}
        </select>
        {selectedPokemon && (
          <MdDeleteForever
            className="text-red-500 text-3xl cursor-pointer"
            onClick={() => handleDelete(selectedPokemon.id as string)}
          />
        )}
      </div>
    </div>
  );
};

export default PokemonSelector;
