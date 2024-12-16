import { Character } from "@/classes/Character";

const getSelectedCharacter = () => {
    const selectedCharacterJSON = localStorage.getItem("selected_character");
    
    if(selectedCharacterJSON) {
        const selectedCharacter = JSON.parse(selectedCharacterJSON);

        return new Character(selectedCharacter.name, selectedCharacter.pokemon);
    }
}

const saveSelectedCharacter = (character: Character | undefined) => {
    localStorage.setItem("selected_character", JSON.stringify(character));
};

export default { getSelectedCharacter, saveSelectedCharacter };