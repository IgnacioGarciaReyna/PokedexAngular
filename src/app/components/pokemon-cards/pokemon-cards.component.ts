import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.css'],
})
export class PokemonCardsComponent implements OnInit {
  constructor(private _pokemonService: PokemonService) {
    this._pokemonService.getPokemons().subscribe(console.log);
  }

  ngOnInit(): void {}
}
