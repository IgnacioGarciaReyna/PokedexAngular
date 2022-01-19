import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonResponse } from '../interfaces/pokemonResponse.interface';
import { concatMap, pluck } from 'rxjs/operators';
import { from } from 'rxjs';
import { IPokemon } from '../interfaces/IPokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private offset: number = 500;
  private limit: number = 50;

  constructor(private _http: HttpClient) {}

  getPokemons() {
    let url = `https://pokeapi.co/api/v2/pokemon-form/?offset=${this.offset}&limit=${this.limit}`;

    return this._http.get<PokemonResponse>(url).pipe(
      pluck('results'),
      concatMap((pokemonList) =>
        from(pokemonList).pipe(
          concatMap((pokemon) => this._http.get(pokemon.url))
        )
      )
    );
  }
}
