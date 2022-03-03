import { Component, Input, OnInit, Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { IPokemon, Pokemon } from 'src/app/interfaces/IPokemon.interface';
import { PokemonResponse } from 'src/app/interfaces/pokemonResponse.interface';
import { PokemonColorsService } from 'src/app/services/pokemon-colors.service';
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

  //Opciones filtradas del search
  public filteredOptions: string[] = [];
  public finalOptions: string[] = [];

  constructor(
    private _pokemonService: PokemonService,
    private _router: Router,
    private _colorService: PokemonColorsService
  ) {
    //Metodo que guarda los Pokemons en la pokemonList
    this._pokemonService.getPokemons(this.page).subscribe({
      next: (pokemon: IPokemon | any) => {
        this.loadingSpinner = true;
        console.log(pokemon);
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
    });

    //Método del search
    this.searchPokemonInput.valueChanges
      .pipe(
        debounceTime(1500),
        tap({
          next: () => {
            this.loadingSpinner = true;
            this.pokemonList = [];
          },
        }),
        map((entry: string) => {
          this.filteredOptions = this.namesList.filter((pokemonName) =>
            pokemonName.toLowerCase().includes(entry.toLowerCase())
          );
          this.filteredOptions.map((option: string) =>
            this._pokemonService.getPokemonByName(option.toLocaleLowerCase())
          );
          return entry;
        }),
        switchMap((entry: string) => {
          if (entry == this.filteredOptions.find((option) => option == entry))
            return this._pokemonService.getPokemonByName(
              entry.toLocaleLowerCase()
            );
          return this._pokemonService.getPokemons(this.page);
        }),
        tap({
          error: console.log,
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

  //Método que te lleva a la bio del pokemon
  goToBio(name: string) {
    this._router.navigate(['bio', name]);
  }

  //Método para los colores
  public getColorTypesPokemon(typePokemon: string) {
    return this._colorService.getColorByType(typePokemon);
  }
}
