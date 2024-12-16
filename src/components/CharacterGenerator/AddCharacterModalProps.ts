import { Character } from "@/classes/Character";


export interface AddCharacterModalProps {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    setCharacters: (value: Character[]) => void;
}