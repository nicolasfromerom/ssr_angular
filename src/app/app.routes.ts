import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page').then((m) => m.AboutPage),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contactpage').then((m) => m.ContactPage),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page').then((m) => m.PricingPage),
  },
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page').then((m) => m.PokemonsPage),
  },
  {
    path: 'pokemon/:name',
    loadComponent: () => import('./pages/pokemon/pokemon-page').then((m) => m.PokemonPage),
  },
  {
    path: '**',
    redirectTo: 'about',
  },
];
