import AboutCard from "./AboutCard";

export default function HomeAbout() {
  return (
    <div className="bg-neutral-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:mx-24 p-6 gap-6">
        <AboutCard
          title="Save Time"
          description="Instantly generate character sheets and reduce prep time by 99%.
            Skip the manuals and dive straight into your next session with zero
            hassle."
        />
        <AboutCard
          title="DM-Friendly Tools"
          description="Designed with Dungeon Masters in mind — quickly generate encounters, manage NPCs, and keep your sessions flowing smoothly with minimal effort."
        />
        <AboutCard
          title="Reusability"
          description="Create and save multiple characters, each with their own Pokémon
            lineup. Effortlessly switch between builds whenever inspiration
            strikes."
        />
        <AboutCard
          title="Effortless Generation"
          description="Quickly discover and generate Pokémon with accurate DND 5e stats.
            Designed to be intuitive, even for first-time DMs and players."
        />
        <AboutCard
          title="Custom Stats & Movesets"
          description="Easily tweak stats, abilities, and movesets to fit your world. Perfect for homebrew sessions or balancing encounters on the fly."
        />
        <AboutCard
          title="Accessible Anywhere"
          description="Use the tool on desktop, tablet, or mobile. Whether you're prepping at home or mid-session at the table, your data is always within reach."
        />
      </div>
    </div>
  );
}
