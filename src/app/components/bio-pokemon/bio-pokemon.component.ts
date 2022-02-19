import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvolutionChain } from 'src/app/interfaces/evolutionChain.interface';
import { IPokemon, IPokemonURL } from 'src/app/interfaces/IPokemon.interface';
import { ISpecies } from 'src/app/interfaces/pokemonSpecies.interface';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-bio-pokemon',
  templateUrl: './bio-pokemon.component.html',
  styleUrls: ['./bio-pokemon.component.css'],
})
export class BioPokemonComponent implements OnInit {
  public pokemon: IPokemonURL | undefined = undefined;
  public pokemonSpecies: ISpecies | any = undefined;
  public isBaby: string = ' ';
  public isLegendary: string = ' ';
  public isMythical: string = ' ';
  public hasDenderDifferences: string = ' ';

  //Evolución
  public evolutionChain: IEvolutionChain | any = undefined;

  constructor(
    public _pokemonService: PokemonService,
    private _activatedRoute: ActivatedRoute
  ) {
    let pokemonName: string = _activatedRoute.snapshot.params['pokemonName'];
    this._pokemonService.getPokemonByName(pokemonName).subscribe({
      next: (object: IPokemonURL | any) => (this.pokemon = object),
      complete: () => {
        console.log(this.pokemon),
          _pokemonService.getUrl(this.pokemon?.species.url).subscribe({
            next: (species) => {
              (this.pokemonSpecies = species),
                (this.isBaby = _pokemonService.characteristicsConditional(
                  this.pokemonSpecies.is_baby
                )),
                (this.isLegendary = _pokemonService.characteristicsConditional(
                  this.pokemonSpecies.is_legendary
                )),
                (this.isMythical = _pokemonService.characteristicsConditional(
                  this.pokemonSpecies.is_mythical
                )),
                (this.hasDenderDifferences =
                  _pokemonService.characteristicsConditional(
                    this.pokemonSpecies.has_gender_differences
                  )),
                console.log(this.pokemonSpecies);
            },
            complete: () =>
              _pokemonService
                .getUrl(this.pokemonSpecies.evolution_chain.url)
                .subscribe({
                  next: (object) => {
                    (this.evolutionChain = object),
                      console.log(this.evolutionChain);
                  },
                }),
          });
      },
    });
  }

  ngOnInit(): void {}
}
