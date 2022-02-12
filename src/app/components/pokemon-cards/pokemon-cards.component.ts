import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs/operators';
import { IPokemon } from 'src/app/interfaces/IPokemon.interface';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.css'],
})
export class PokemonCardsComponent implements OnInit {
  //Lista donde se guardaran los pokemons a mostrar
  public pokemonList: IPokemon[] = [];

  //Boleano para el spinner
  public loadingSpinner: boolean = false;

  //Página actual
  private page: number = 0;

  //Formulario del search
  public searchPokemonInput: FormControl = new FormControl();

  constructor(private _pokemonService: PokemonService) {
    //Metodo que guarda los Pokemons en la pokemonList
    this._pokemonService.getPokemons(this.page).subscribe({
      next: (pokemon: IPokemon | any) => {
        this.loadingSpinner = true;
        this.pokemonList.push(pokemon);
      },
      complete: () => {
        this.loadingSpinner = false;
      }
    });
  }

  ngOnInit(): void {
    //Metodo del search
    this.searchPokemonInput.valueChanges
      .pipe(
        delay(1500),
        tap({
          next: () => {
            this.loadingSpinner = true;
            this.pokemonList = [];
          },
        }),
        switchMap((entry: string) => {
          if (entry !== '') return this._pokemonService.getPokemonByName(entry.toLocaleLowerCase());
          return this._pokemonService.getPokemons(this.page);
        })
      )
      .subscribe({
        next: (pokemon: IPokemon) => {
          this.pokemonList.push(pokemon);
          this.loadingSpinner = false;
        },
      });
  }

  //Metodo que reacciona a los botones "Previous" y "Next"
  loadNewPage(event: any) {
    if (event.target.value == 'next') {
      this.page++;
    } else if (event.target.value == 'previous' && this.page > 0) {
      this.page--;
    }

    this.loadingSpinner = true;
    this.pokemonList = [];

    this._pokemonService.getPokemons(this.page).subscribe({
      next: (pokemon: IPokemon | any) => {
        this.pokemonList.push(pokemon);
      },
      complete: () => {
        this.loadingSpinner = false;
      }
    });
  }
}
