import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPokemon, IPokemonURL } from 'src/app/interfaces/IPokemon.interface';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-bio-pokemon',
  templateUrl: './bio-pokemon.component.html',
  styleUrls: ['./bio-pokemon.component.css'],
})
export class BioPokemonComponent implements OnInit {
  public pokemon: IPokemonURL | undefined = undefined;

  constructor(
    public _pokemonService: PokemonService,
    private _activatedRoute: ActivatedRoute
  ) {
    let pokemonName: string = _activatedRoute.snapshot.params['pokemonName'];
    this._pokemonService.getPokemonByName(pokemonName).subscribe({
      next: (object: IPokemonURL | any) => (this.pokemon = object),
      complete: () => console.log(this.pokemon),
    });
  }

  ngOnInit(): void {}
}
