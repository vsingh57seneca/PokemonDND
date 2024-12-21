import { characterTableAtom } from "@/atoms/atoms";
import { CharacterTable } from "@/classes/database/CharacterTable";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { Character } from "@/classes/Character";
import toast from "react-hot-toast";

const CharacterGenerator = () => {
  const [characterTable, setCharacterTable] = useAtom(characterTableAtom);
  const [showAddCharactermodal, setShowAddCharacterModal] =
    useState<boolean>(false);

    const [name, setName] = useState<string>("");

    const handleCreate = () => {
      const newCharacter = new Character(name);
    
      if (newCharacter) {
        if (!characterTable?.exists(newCharacter.name)) {
          // Create a new CharacterTable with updated records
          const updatedTable = new CharacterTable();
          updatedTable.records = [...(characterTable?.records || []), newCharacter];
          updatedTable.saveTableToStorage();
    
          setCharacterTable(updatedTable); // Update state with a new instance
          setShowAddCharacterModal(false);
          toast.success("Character created successfully");
          return;
        }
      }
    
      toast.error("Character with this name already exists");
    };

    useEffect(() => {
      console.log(characterTable);
    }, [characterTable]);

  return (
    <div className="flex flex-col gap-y-2">
      <h1>Available Characters: {characterTable?.getNumberOfRecords() || 0}</h1>
      <button 
      className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
      onClick={() => setShowAddCharacterModal(!showAddCharactermodal)}
      >
        Create Character
      </button>

      {showAddCharactermodal && (
        <Modal
          showModal={showAddCharactermodal}
          setShowModal={setShowAddCharacterModal}
          modal_id="create_character"
          modalTitle="Create Character"
          actionButton={<>
          {name.length > 0 && <button className="px-4 py-2 bg-green-500 rounded text-white" onClick={handleCreate}>Create</button>}
          </>}
        >
          <div className="">
            <div className="flex flex-col w-full">
                <h1 className="font-semibold">Character Name:</h1>
                <input className="border-2 rounded px-2" type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={15} minLength={1} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CharacterGenerator;
