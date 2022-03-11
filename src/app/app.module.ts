import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCardsComponent } from './components/pokemon-cards/pokemon-cards.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutAPIComponent } from './components/about-api/about-api.component';
import { BioPokemonComponent } from './components/bio-pokemon/bio-pokemon.component';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [AppComponent, PokemonCardsComponent, HeaderComponent, HomeComponent, FooterComponent, AboutAPIComponent, BioPokemonComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/PokedexAngular/'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
