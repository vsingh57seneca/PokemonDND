import { characterTableAtom, selectedCharacterAtom } from "@/atoms/atoms";
import { Character } from "@/classes/Character";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/router";

const CharacterSelector = () => {
  const router = useRouter();
  const [characterTable] = useAtom(characterTableAtom);
  const [selectedCharacter, setSelectedCharacter] = useAtom(
    selectedCharacterAtom
  );

  // Initialize selectedCharacter to null on page load
  useEffect(() => {
    if (!selectedCharacter) {
      setSelectedCharacter(undefined); // Explicitly set to undefined if not initialized
    }
  }, [selectedCharacter, setSelectedCharacter]);

  const handleCharacterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = characterTable?.read(e.target.value) as Character;
    if (selected) {
      setSelectedCharacter(selected);
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        <select
          className="text-black px-4 py-2"
          value={selectedCharacter?.id || ""}
          onChange={handleCharacterChange}
        >
          <option value="" disabled>
            Select a Character
          </option>
          {characterTable?.getExistingRecords().map((record) => (
            <option key={record.id} value={record.id}>
              {record.name}
            </option>
          ))}
        </select>
        {selectedCharacter && (
          <MdDeleteForever className="text-3xl text-red-500 hover:text-red-600 cursor-pointer" />
        )}
      </div>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
        onClick={() => router.push(`/dm/${selectedCharacter?.name}`)}
      >
        Continue
      </button>
    </>
  );
};

export default CharacterSelector;
