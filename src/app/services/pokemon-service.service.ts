import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  PokemonResponse,
  PokemonResults,
} from '../interfaces/pokemonResponse.interface';
import { concatMap, mergeMap, pluck } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { IPokemon } from '../interfaces/IPokemon.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private offset: number = 500;
  private limit: number = 8;

  constructor(private _http: HttpClient) {}

  //Metodo que obtiene 8 pokemons y pide la página actual
  getPokemons(page: number): Observable<any> {
    this.offset = page * 8;
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

  //Método que trae todos los nombres de los pokemons
  getPokemonsNames() {
    let url = `https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=800`;

    return this._http.get<PokemonResponse>(url).pipe(
      pluck('results'),
      concatMap((pokemonList) =>
        from(pokemonList).pipe(
          mergeMap((pokemon) => this._http.get(pokemon.url))
        )
      )
    );
  }

  //Método para obtener un pokemon por su nombre
  getPokemonByName(entry: string): Observable<PokemonResponse> {
    let url = `http://pokeapi.co/api/v2/pokemon/${entry}`;
    return this._http.get<PokemonResponse>(url);
  }
}
