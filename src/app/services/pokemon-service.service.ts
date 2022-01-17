import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private offset: number = 500;
  private limit: number = 50;

  constructor(private _http: HttpClient) {}

  getPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon-form/?offset=${this.offset}&limit=${this.limit}`;

    return this._http.get(url);
  }
}
