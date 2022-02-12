import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutAPIComponent } from './components/about-api/about-api.component';
import { HomeComponent } from './components/home/home.component';
import { PokemonCardsComponent } from './components/pokemon-cards/pokemon-cards.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pokemons', component: PokemonCardsComponent },
  { path: 'about', component: AboutAPIComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
