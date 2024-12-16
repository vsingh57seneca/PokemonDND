import { Character } from "@/classes/Character";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { AddCharacterModalProps } from "./AddCharacterModalProps";

const AddCharacterModal: React.FC<AddCharacterModalProps> = ({showModal, setShowModal, setCharacters }) => {
  const [characterName, setCharacterName] = useState<string>("");
  const router = useRouter();

  const createCharacter = async () => {
    const newCharacter = new Character(characterName, []);
    const existingCharacters = localStorage.getItem("characters");
    const updatedCharactersArray: Character[] = existingCharacters ? JSON.parse(existingCharacters) : [];

    updatedCharactersArray.push(newCharacter);

    localStorage.setItem("characters", JSON.stringify(updatedCharactersArray));

    setCharacters(updatedCharactersArray);

    setShowModal(false);

    router.push('/');
  }

  return (
    <div className="text-black absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center">
      <div className="border bg-white w-[90%] md:w-[60%] lg:w-[40%] rounded-lg p-6">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-lg font-bold">Create Character</h1>
          <label htmlFor="">
            <h2 className="font-semibold">Trainer Name:</h2>
            <input className="border rounded w-full border-black px-2 py-1" value={characterName} onChange={(e) => setCharacterName(e.target.value)} />
          </label>
          <div className="flex justify-center">
            <button onClick={createCharacter} className="bg-green-500 flex justify-center px-4 py-2 rounded text-white">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCharacterModal;
