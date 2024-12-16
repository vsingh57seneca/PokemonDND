export class Pokemon {
    id?: string;
    name: string;
    number: number;
    type: string[];
    abilities: string[];
    hidden_ability: string;
    armor_class: number;
    hit_points: number;
    current_hit_points: number | null;
    level: number;
    current_level: number | null;
    evolution: string;
    hit_dice: string;
    speed: string[];
    stats: Record<string, any>;
    moves: Record<string, any>;
    proficient_skills: string[];
    resistances: string[];
    vulnerabilities: string[];
    immunities: string[];
    saving_throws: string[];
    tm: string[];
    sr: string;
    starting_moves: string[];
    image: string;
    given_name?: string;
    selected_moves? :string[];
    stab?: number;
    proficiency_bonus?: number;
    selected_ability?: string;
  
    constructor(pokemon: any) {
      this.name = pokemon.name;
      this.number = Number(pokemon.number);
      this.type = pokemon.type;
      this.abilities = pokemon.abilities;
      this.hidden_ability = pokemon.hidden_ability;
      this.armor_class = pokemon.armor_class;
      this.hit_points = pokemon.hit_points;
      this.current_hit_points = pokemon.current_hit_points;
      this.level = pokemon.level;
      this.current_level = pokemon.current_level;
      this.evolution = pokemon.evolution;
      this.hit_dice = pokemon.hit_dice;
      this.speed = pokemon.speed;
      this.stats = pokemon.stats;
      this.moves = pokemon.moves;
      this.proficient_skills = pokemon.proficient_skills;
      this.resistances = pokemon.resistances;
      this.vulnerabilities = pokemon.vulnerabilities;
      this.immunities = pokemon.immunities;
      this.saving_throws = pokemon.saving_throws;
      this.tm = pokemon.tm;
      this.sr = pokemon.sr;
      this.starting_moves = pokemon.starting_moves;
      this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.number}.png`;
      this.id = pokemon.id;
      this.given_name = pokemon.given_name;
      this.selected_moves = pokemon.selected_moves;
      this.stab = pokemon.stab;
      this.proficiency_bonus = pokemon.proficiency_bonus;
      this.selected_ability = pokemon.selected_ability;
    }

    calculateHP(selected_level: number): number {
      let dice = parseInt(this.hit_dice.replace("d", "").trim()) / 2 + 1;
      let base_level = selected_level - this.level;
      console.log((dice * base_level) + this.hit_points)
      return (dice * base_level) + this.hit_points;
    }

    updateHP(hp: string) {
      if(Number(hp) <= this.hit_points && Number(hp) >= 0) {
        this.current_hit_points = Number(hp);
      }
    }

  }
  