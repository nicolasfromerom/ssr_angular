import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonsService } from '../../pokemons/services/pokemons';
import { map, tap } from 'rxjs';
import { SimplePokemon } from '../../pokemons/interfaces';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton, RouterLink],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPage {
  private readonly pokemonsService = inject(PokemonsService);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);

  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (Number.isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  public loadOnPageChanged = effect(
    () => {
      this.loadPokemons(this.currentPage());
    },
    { allowSignalWrites: true },
  );

  public loadPokemons(page = 0) {
    const newPage = page;
    this.pokemonsService
      .loadPage(newPage)
      .pipe(tap(() => this.title.setTitle(`Pokémons SSR - Page ${newPage}`)))
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
