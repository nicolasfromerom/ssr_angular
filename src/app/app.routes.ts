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
    path: '**',
    redirectTo: 'about',
  },
];
