import React, { useEffect, useState } from "react";
import AddCharacterModal from "./AddCharacterModal";
import { useRouter } from "next/router";
import { CharacterGeneratorProps } from "./CharacterGeneratorProps";
import { Character } from "@/classes/Character";

const CharacterGenerator: React.FC<CharacterGeneratorProps> = ({selectedCharacter, onCharacterSelect}) => {
  const router = useRouter();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [showAddCharacterModal, setShowAddCharacterModal] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const storedCharacters = localStorage.getItem("characters");

        if (storedCharacters) {
          setCharacters(JSON.parse(storedCharacters));
        } else {
          console.log("No characters found in localStorage");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacters();
  }, []);

  useEffect(() => {
    if (characters.length > 0) {
      onCharacterSelect(characters[0]);
    }
  }, [characters]);

  useEffect(() => {
    localStorage.setItem('selected_character', JSON.stringify(selectedCharacter))
  }, [selectedCharacter])

  const addCharacter = async () => {
    setShowAddCharacterModal(!showAddCharacterModal);
  };

  const handleCharacterSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCharacterName = String(event.target.value);
    const character = characters.find((char) => char.name === selectedCharacterName);

    if(character) {
      onCharacterSelect(character);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-6 items-center">
        <h1>Character Selection</h1>

        {/* Display fetched Characters if characters exist*/}
        {characters.length > 0 && (
          <div className="flex flex-col items-center">
            <p>Available Characters: {characters.length}</p>
            <p>Selected Character: {selectedCharacter && selectedCharacter.name}</p>
            <select
            className="mt-2 px-4 py-2 border rounded text-black"
            value={selectedCharacter?.name}
            onChange={handleCharacterSelect}
            >
              {characters.map((character, index) => (
                <option key={index} value={character.name}>
                  {character.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Add Character Button */}
        <button
          className="px-4 py-2 rounded bg-green-500 text-white"
          onClick={addCharacter}
        >
          Add Character
        </button>
      
      </div>
      {/* Add Characters Modal */}
      {showAddCharacterModal && (
        <AddCharacterModal
          showModal={showAddCharacterModal}
          setShowModal={setShowAddCharacterModal}
          setCharacters={setCharacters}
        />
      )}
    </>
  );
};

export default CharacterGenerator;
