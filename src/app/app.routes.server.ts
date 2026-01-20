import { RenderMode, ServerRoute } from '@angular/ssr';

const TOTAL_POKEMONS = 10;

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Array.from({ length: TOTAL_POKEMONS }, (_, index) => ({
        page: (index + 1).toString(),
      }));
    },
  },
  {
    path: 'pokemon/:name',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const pokemonNameList = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`,
      ).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon names');
        }
        return response.json();
      });

      const pokemonList = pokemonNameList.results.map((pokemon: { name: string }) => ({
        name: pokemon.name,
      }));

      return pokemonList;
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
