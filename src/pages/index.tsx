import React, { useState, useEffect, useContext, useCallback } from "react";
import CharacterGenerator from "../../src/components/CharacterGenerator/CharacterGenerator";
import { useRouter } from "next/router";
import { Character } from "@/classes/Character";
import { useAtom } from "jotai";
import { selectedCharacterAtom } from "@/atoms/atoms";

export default function Home() {
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useAtom(selectedCharacterAtom);

  const handleSetSelectedCharacter = useCallback((character: Character | undefined) => {
    setSelectedCharacter(character);
  }, [])

  const handleContinue = () => {
    router.push('/dnd/pokemon');
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-y-4">
      <CharacterGenerator selectedCharacter={selectedCharacter!} onCharacterSelect={handleSetSelectedCharacter} />
      
        {/* Continue Button */}
        {selectedCharacter && <button className="px-4 py-2 rounded bg-blue-500 text-white" onClick={handleContinue}>Continue</button>}
    </div>
  );
}
