export interface PokemonResponse {
  count: number;
  next: string;
  previous: null | string;
  results: PokemonResults[];
}

interface PokemonResults {
  name: string;
  url: string;
}
