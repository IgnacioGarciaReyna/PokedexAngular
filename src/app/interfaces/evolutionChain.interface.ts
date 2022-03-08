import { PokemonResults } from "./pokemonResponse.interface";

export interface IEvolutionChain {
  baby_trigger_item?: any;
  chain: IChain;
  id: number;
}

export interface IChain {
  evolution_details: any[];
  evolves_to: Evolvesto2[];
  is_baby: boolean;
  species: PokemonResults;
}

export interface Evolvesto2 {
  evolution_details: Evolutiondetail[];
  evolves_to: Evolvesto[];
  is_baby: boolean;
  species: PokemonResults;
}

export interface Evolvesto {
  evolution_details: Evolutiondetail[];
  evolves_to: any[];
  is_baby: boolean;
  species: PokemonResults;
}

interface Evolutiondetail {
  gender?: any;
  held_item?: any;
  item?: any;
  known_move?: any;
  known_move_type?: any;
  location?: any;
  min_affection?: any;
  min_beauty?: any;
  min_happiness?: any;
  min_level: number;
  needs_overworld_rain: boolean;
  party_species?: any;
  party_type?: any;
  relative_physical_stats?: any;
  time_of_day: string;
  trade_species?: any;
  trigger: PokemonResults;
  turn_upside_down: boolean;
}

