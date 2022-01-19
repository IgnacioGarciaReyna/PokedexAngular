import { Component, Input, OnInit } from '@angular/core';
import { IPokemon } from 'src/app/interfaces/IPokemon.interface';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.css'],
})
export class PokemonCardsComponent implements OnInit {
  public pokemonList: IPokemon[] = [];

  constructor(private _pokemonService: PokemonService) {
    this._pokemonService.getPokemons().subscribe({
      next: (pokemon: IPokemon | any) => {
        console.log(pokemon);
        this.pokemonList.push(pokemon);
      },
    });
  }

  ngOnInit(): void {}
}
