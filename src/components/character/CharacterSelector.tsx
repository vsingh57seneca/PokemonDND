import { characterTableAtom, selectedCharacterAtom } from "@/atoms/atoms";
import { Character } from "@/classes/Character";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { CharacterTable } from "@/classes/database/CharacterTable";

const CharacterSelector = () => {
  const router = useRouter();
  const [characterTable, setCharacterTable] = useAtom(characterTableAtom);
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
    const selected = characterTable?.read(e.target.value) as
      | Character
      | undefined;
    if (selected) {
      setSelectedCharacter(selected);
    } else {
      toast.error("Character not found");
    }
  };
  
  const handleDelete = (characterId: string) => {
    const updatedCharactersRecords = characterTable?.records.filter(
      (record) => record.id !== characterId
    );
  
    if (updatedCharactersRecords && updatedCharactersRecords.length !== characterTable?.records.length) {
      // Create a new CharacterTable with updated records
      const updatedTable = new CharacterTable();
      updatedTable.records = updatedCharactersRecords;
      updatedTable.saveTableToStorage();
  
      setCharacterTable(updatedTable); // Update state with a new instance
      setSelectedCharacter(undefined);
      toast.success("Character deleted successfully");
    } else {
      toast.error("Failed to delete character");
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-2">
        {characterTable?.getNumberOfRecords() === 0 ? (
          <p className="text-gray-500">
            No characters available. Create one!
          </p>
        ) : (
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
        )}
        {selectedCharacter && (
          <MdDeleteForever
            className="text-3xl text-red-500 hover:text-red-600 cursor-pointer"
            onClick={() => handleDelete(selectedCharacter.id as string)}
          />
        )}
      </div>
      <button
        disabled={selectedCharacter ? false : true}
        className={`mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded ${!selectedCharacter && 'bg-gray-500 cursor-not-allowed'}`}
        onClick={() => router.push(`/dm/${selectedCharacter?.name}`)}
      >
        Continue
      </button>
    </>
  );
};

export default CharacterSelector;
