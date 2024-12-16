import { Character } from "@/classes/Character";

export interface CharacterGeneratorProps {
    selectedCharacter?: Character;
    onCharacterSelect: (selectedCharacter: Character) => void;
}