
import React, { useEffect,} from "react";
import { useRouter } from "next/router";
import CharacterGenerator from "@/components/character/CharacterGenerator";
import CharacterSelector from "@/components/character/CharacterSelector";
export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col gap-y-4 p-4 items-center justify-center">
      <CharacterGenerator />
      <CharacterSelector />
    </div>
  );
}
