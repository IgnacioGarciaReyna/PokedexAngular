import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { IEvolutionChain } from 'src/app/interfaces/evolutionChain.interface';
import { IPokemonURL } from 'src/app/interfaces/IPokemon.interface';
import { ISpecies } from 'src/app/interfaces/pokemonSpecies.interface';
import { PokemonColorsService } from 'src/app/services/pokemon-colors.service';
import { PokemonService } from 'src/app/services/pokemon-service.service';

@Component({
  selector: 'app-bio-pokemon',
  templateUrl: './bio-pokemon.component.html',
  styleUrls: ['./bio-pokemon.component.css'],
})
export class BioPokemonComponent implements OnInit {
  public pokemon: IPokemonURL | undefined = undefined;
  public pokemonSpecies: ISpecies | any = undefined;
  public hasDenderDifferences: string = ' ';

  //Evolución
  public evolutionChain: IEvolutionChain | any = undefined;

  public loadingSpinner: boolean = true;

  public pokemonName: string | any = '';

  private subsOnInit: any;

  constructor(
    public _pokemonService: PokemonService,
    private _activatedRoute: ActivatedRoute,
    private _colorService: PokemonColorsService,
    public _router: Router
  ) {}

  ngOnInit(): void {
    this.subsOnInit = this._activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.loadingSpinner = true;
        this.pokemonName = params.get('pokemonName');
        this._pokemonService.getPokemonByName(this.pokemonName).subscribe({
          next: (object: IPokemonURL | any) => (this.pokemon = object),
          complete: () => {
            console.log(this.pokemon),
              this._pokemonService.getUrl(this.pokemon?.species.url).subscribe({
                next: (species) => {
                  (this.pokemonSpecies = species),
                    (this.hasDenderDifferences =
                      this._pokemonService.characteristicsConditional(
                        this.pokemonSpecies.has_gender_differences
                      )),
                    console.log(this.pokemonSpecies);
                },
                complete: () =>
                  this._pokemonService
                    .getUrl(this.pokemonSpecies.evolution_chain.url)
                    .subscribe({
                      next: (object) => {
                        (this.evolutionChain = object),
                          (this.loadingSpinner = false);
                        console.log(this.evolutionChain);
                      },
                    }),
              });
          },
        });
      }
    );
  }

  public getColorTypesPokemon(typePokemon: string) {
    return this._colorService.getColorByType(typePokemon);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subsOnInit.unsusbcribe();
  }
}
