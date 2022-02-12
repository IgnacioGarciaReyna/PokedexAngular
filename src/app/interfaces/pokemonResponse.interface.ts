export interface PokemonResponse {
  count: number;
  next: string;
  previous: null | string;
  results: PokemonResults[];
}

export interface PokemonResults {
  name: string;
  url: string;
}
