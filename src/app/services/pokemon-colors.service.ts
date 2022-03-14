import { Injectable } from '@angular/core';
import {
  IEggColor,
  IPokedexColor,
  IPokemonColor,
} from '../interfaces/IPokemonColor.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonColorsService {
  private colorPokemonByTypes: IPokemonColor[] = [
    {
      type: 'grass',
      color: '#78C850',
    },
    {
      type: 'steel',
      color: '#A8A8C0',
    },
    {
      type: 'water',
      color: '#3899F8',
    },
    {
      type: 'bug',
      color: '#A8B820',
    },
    {
      type: 'dragon',
      color: '#7860E0',
    },
    {
      type: 'electric',
      color: '#F8D030',
    },
    {
      type: 'ghost',
      color: '#6060B0',
    },
    {
      type: 'fire',
      color: '#F05030',
    },
    {
      type: 'fairy',
      color: '#E79FE7',
    },
    {
      type: 'ice',
      color: '#58C8E0',
    },
    {
      type: 'fighting',
      color: '#A05038',
    },
    {
      type: 'normal',
      color: '#A8A090',
    },
    {
      type: 'psychic',
      color: '#F870A0',
    },
    {
      type: 'rock',
      color: '#B8A058',
    },
    {
      type: 'dark',
      color: '#7A5848',
    },
    {
      type: 'ground',
      color: '#E9D6A4',
    },
    {
      type: 'poison',
      color: '#B058A0',
    },
    {
      type: 'flying',
      color: '#98A8F0',
    },
  ];

  private colorPokemonByEggs: IEggColor[] = [
    {
      eggType: 'monster',
      color: '#D25064',
    },
    {
      eggType: 'water1',
      color: '#97B5FD',
    },
    {
      eggType: 'bug',
      color: '#AAC22A',
    },
    {
      eggType: 'flying',
      color: '#B29AFA',
    },
    {
      eggType: 'ground',
      color: '#E0C068',
    },
    {
      eggType: 'fairy',
      color: '#FFC8F0',
    },
    {
      eggType: 'grass',
      color: '#82D25A',
    },
    {
      eggType: 'no-eggs',
      color: '#5c5c5c',
    },
    {
      eggType: 'humanshape',
      color: '#D29682',
    },
    {
      eggType: 'water3',
      color: '#5876BE',
    },
    {
      eggType: 'mineral',
      color: '#729AFA',
    },
    {
      eggType: 'amorphous',
      color: '#8A8A8A',
    },
    {
      eggType: 'water2',
      color: '#729AFA',
    },
    {
      eggType: 'ditto',
      color: '#A664BF',
    },
    {
      eggType: 'dragon',
      color: '#7A42FF',
    },
    {
      eggType: 'indeterminate',
      color: 'white',
    },
  ];

  private pokedexColors: IPokedexColor[] = [
    {
      name: 'red',
      primaryColor: '#fb919d',
      secondaryColor:'#ffebed'
    },
    {
      name: 'white',
      primaryColor: '#F0F0F0',
      secondaryColor:'#f0f0ff'
    },
    {
      name: 'black',
      primaryColor: '#9d9d9d',
      secondaryColor:'#c9c9c9'
    },
    {
      name: 'blue',
      primaryColor: '#bedcfe',
      secondaryColor:'#e0efff'
    },
    {
      name: 'purple',
      primaryColor: '#e9c7f4',
      secondaryColor:'#f9ebff'
    },
    {
      name: 'green',
      primaryColor: '#c5f2d4',
      secondaryColor:'#e7ffef'
    },
    {
      name: 'gray',
      primaryColor: '#e5e5e5',
      secondaryColor:'#f0f0f0'
    },
    {
      name: 'brown',
      primaryColor: '#ffe1c3',
      secondaryColor:'#fff8f0'
    },
    {
      name: 'pink',
      primaryColor: '#ffcae6',
      secondaryColor:'#ffe9f5'
    },
    {
      name: 'yellow',
      primaryColor: '#ffefb0',
      secondaryColor:'#fffdf5'
    },
  ];

  constructor() {}

  public getColorByType(pokemonType: string) {
    return this.colorPokemonByTypes.find(
      (colorPokemon) => colorPokemon.type == pokemonType
    )?.color;
  }

  public getColorByEgg(pokemonEgg: string) {
    return this.colorPokemonByEggs.find(
      (colorPokemon) => colorPokemon.eggType == pokemonEgg
    )?.color;
  }

  public getColorByPokedex(colorName: string) {
    return this.pokedexColors.find(
      (colorPokedex) => colorPokedex.name == colorName
    );
  }
}
