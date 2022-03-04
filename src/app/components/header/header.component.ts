import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';
import { IPokemon } from 'src/app/interfaces/IPokemon.interface';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //Formulario del search
  public searchPokemonInput: FormControl = new FormControl();

  //Array de nombres de pokemons
  public namesList: string[] = [];

  //Opciones filtradas del search
  public filteredOptions: string[] = [];
  public finalOptions: string[] = [];

  constructor(
    private _pokemonService: PokemonService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    //Llamado al método que trae los nombres de los pokemons para el autocomplete del search
    this._pokemonService.getPokemonsNames().subscribe({
      next: (pokemon: IPokemon | any) => this.namesList.push(pokemon.name),
    });

    //Método del search
    this.searchPokemonInput.valueChanges
      .pipe(
        filter((name) => this.namesList.includes(name.toLowerCase()))
        // debounceTime(1500)
        // tap({
        //   next: () => {
        //     this.loadingSpinner = true;
        //     this.pokemonList = [];
        //   },
        // }),
        // map((entry: string) => {
        //   this.filteredOptions = this.namesList.filter((pokemonName) =>
        //     pokemonName.toLowerCase().includes(entry.toLowerCase())
        //   );
        //   this.filteredOptions.map((option: string) =>
        //     this._pokemonService.getPokemonByName(option.toLocaleLowerCase())
        //   );
        //   return entry;
        // }),
        // switchMap((entry: string) => {
        //   if (entry == this.filteredOptions.find((option) => option == entry))
        //     return this._pokemonService.getPokemonByName(
        //       entry.toLocaleLowerCase()
        //     );
        //   return this._pokemonService.getPokemons(this.page);
        // }),
        // tap({
        //   error: console.log,
        // })
      )
      // .subscribe({
      //   next: (pokemon: IPokemon) => {
      //     this.pokemonList.push(pokemon);
      //     this.loadingSpinner = false;
      //   },
      // });
      .subscribe({
        next: (name) => {
            this._router.navigate(['bio', name]),
            this.searchPokemonInput.setValue('');
        },
      });
  }
}
