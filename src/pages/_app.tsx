import { characterTableAtom } from "@/atoms/atoms";
import { CharacterTable } from "@/classes/database/CharacterTable";
import "@/styles/globals.css";
import { useAtom } from "jotai";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const [characterTable, setCharacterTable] = useAtom(characterTableAtom);

  useEffect(() => {

    const Initialize = async () => {
      setCharacterTable(new CharacterTable());
    }

    Initialize();
  }, []);

  return (
    <div className="h-full w-full">
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}
