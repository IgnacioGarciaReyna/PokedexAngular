import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { debounceTime, mergeMap, tap } from 'rxjs/operators';
import { IEvolutionChain } from 'src/app/interfaces/evolutionChain.interface';
import { IPokemonURL } from 'src/app/interfaces/IPokemon.interface';
import { PokemonResponse } from 'src/app/interfaces/pokemonResponse.interface';
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
  public evolutionNames: string[] = [];
  public evolutionsPokemons: any[] = [];

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
        this.evolutionNames = [];
        this.evolutionsPokemons = [];
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
                      next: (object: IEvolutionChain | any) => {
                        (this.evolutionChain = object),
                          console.log(this.evolutionChain),
                          this.evolutionNames.push(
                            this.evolutionChain.chain.species.name
                          );
                        for (
                          let i = 0;
                          i < this.evolutionChain.chain.evolves_to.length;
                          i++
                        ) {
                          this.evolutionNames.push(
                            this.evolutionChain.chain.evolves_to[i].species.name
                          );
                          for (
                            let j = 0;
                            j <
                            this.evolutionChain.chain.evolves_to[i].evolves_to
                              .length;
                            j++
                          ) {
                            this.evolutionNames.push(
                              this.evolutionChain.chain.evolves_to[i]
                                .evolves_to[j].species.name
                            );
                          }
                        }
                        for (let i = 0; i < this.evolutionNames.length; i++) {
                          this.getEvolution(this.evolutionNames[i]);
                        }
                          (this.loadingSpinner = false);
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

  public getEvolution(name: string) {
    return this._pokemonService.getPokemonByName(name).subscribe({
      next: (pokemon) => this.evolutionsPokemons.push(pokemon),
    });
  }

  //Método que te lleva a la bio del pokemon
  goToBio(name: string) {
    this._router.navigate(['bio', name]);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subsOnInit.unsusbcribe();
  }
}
