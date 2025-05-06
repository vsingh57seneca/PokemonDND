import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { characterTableAtom, selectedCharacterAtom } from "@/atoms/atoms";
import { Character } from "@/classes/Character";
import { CharacterTable } from "@/classes/database/CharacterTable";
import PokemonGenerator from "@/components/pokemon/PokemonGenerator";
import PokemonSelector from "@/components/pokemon/PokemonSelector";
import PokemonWidget from "@/components/pokemon/PokemonWidget";
import PokemonDetails from "@/components/pokemon/PokemonDetails";

const CharacterPage = () => {
  const router = useRouter();
  const { name } = router.query;

  const [characterTable, setCharacterTable] = useAtom(characterTableAtom);
  const [selectedCharacter, setSelectedCharacter] = useAtom(
    selectedCharacterAtom
  );

  useEffect(() => {
    if (!characterTable) {
      setCharacterTable(new CharacterTable());
    }
  }, []);

  useEffect(() => {
    // Only proceed if the query parameter and characterTable are defined
    if (name && characterTable) {
      const character = characterTable.readByName(name as string) as Character;
      if (character) {
        setSelectedCharacter(character);
      } else {
        console.warn(`Character with name "${name}" not found.`);
        router.push("/app");
      }
    }
  }, [name, characterTable, setSelectedCharacter]);

  return (
    <div className="p-4 w-full gap-y-4 flex flex-col h-full">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-3xl">{selectedCharacter?.name}</h1>
        <button
          className="px-4 py-2 bg-purple-500 hover:bg-blue-600 rounded font-semibold"
          onClick={() => router.push("/app")}
        >
          Characters
        </button>
      </div>
      <div className="flex flex-col md:flex-row h-full space-y-6">
        <div className="border-b md:border-r md:border-b-0 flex flex-col items-center gap-y-2">
          <PokemonGenerator />
          <PokemonSelector />
          <PokemonWidget />
        </div>
        <div className="flex-grow w-full overflow-y-auto"><PokemonDetails /></div>
      </div>
    </div>
  );
};

export default CharacterPage;
