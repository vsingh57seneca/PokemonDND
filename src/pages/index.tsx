import React, { useEffect } from "react";
import { useRouter } from "next/router";
import CharacterGenerator from "@/components/character/CharacterGenerator";
import CharacterSelector from "@/components/character/CharacterSelector";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-neutral-900 h-full">
      <div className="gap-4 p-6 items-center justify-center flex lg:mx-24">
        {/* <CharacterGenerator />
      <CharacterSelector /> */}
        <div className="lg:flex">
        <Hero
          height="h-[80dvh]"
          title="Catch, Customize, Conquer!"
          sub_title="Bring Pokémon into your DND 5e world with instant character sheets and smart Pokémon picks — made just for Dungeon Masters like you."
          actionButton={
            <button
              className="border-2 border-blue-500 bg-yellow-500 text-xl text-blue-700 font-bold px-3 py-2 hover:bg-yellow-500 hover:text-blue-400 transition ease-in-out duration-300"
              onClick={() => router.push("/app")}
            >
              Start Your Adventure
            </button>
          }
        />
        </div>
        <Image priority className="hidden lg:block select-none" src={'/pokemon-splash.png'} width={850} height={0} alt="Pokemon" />
      </div>
      <div className="scroll-smooth">
        <HomeAbout />
      </div>
    </div>
  );
}
