import CharacterGenerator from "@/components/character/CharacterGenerator";
import CharacterSelector from "@/components/character/CharacterSelector";
import React from "react";
const App: React.FC = () => {
  return (
    <>
      <div className="flex flex-col mx-auto w-3/4 items-center justify-center h-full gap-6">
        <CharacterGenerator />
        <CharacterSelector />
      </div>
    </>
  );
};

export default App;
