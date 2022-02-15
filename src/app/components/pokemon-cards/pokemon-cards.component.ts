import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { IPokemon } from 'src/app/interfaces/IPokemon.interface';
import { PokemonResponse } from 'src/app/interfaces/pokemonResponse.interface';
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

  //Array de nombres de pokemons
  public namesList: string[] = [];

  constructor(private _pokemonService: PokemonService) {
    //Metodo que guarda los Pokemons en la pokemonList
    this._pokemonService.getPokemons(this.page).subscribe({
      next: (pokemon: IPokemon | any) => {
        this.loadingSpinner = true;
        this.pokemonList.push(pokemon);
      },
      complete: () => {
        this.loadingSpinner = false;
      },
    });
  }

  ngOnInit(): void {
    //Llamado al método que trae los nombres de los pokemons para el autocomplete del search
    this._pokemonService.getPokemonsNames().subscribe({
      next: (pokemon: IPokemon | any) => this.namesList.push(pokemon.name),
      complete: () => console.log(this.namesList),
    });

    //Método del search
    this.searchPokemonInput.valueChanges
      .pipe(
        tap(console.log),
        debounceTime(1500),
        tap({
          next: () => {
            this.loadingSpinner = true;
            this.pokemonList = [];
          },
        }),
        switchMap((entry: string) => {
          if(entry.length > 3) {
            console.log("entry es mayor a 3")
          }




          if (entry !== '')
            return this._pokemonService.getPokemonByName(
              entry.toLocaleLowerCase()
            );
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
      },
    });
  }
}
