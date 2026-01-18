import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonsService } from '../../pokemons/services/pokemons';
import { map, tap } from 'rxjs';
import { SimplePokemon } from '../../pokemons/interfaces';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPage implements OnInit {
  private readonly pokemonsService = inject(PokemonsService);
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly router = inject(Router);

  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (Number.isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page)),
    ),
  );

  ngOnInit() {
    console.log('Current page on init:', this.currentPage());
    this.loadPokemons();
  }

  public loadPokemons(page = 0) {
    const newPage = this.currentPage()! + page;
    this.pokemonsService
      .loadPage(newPage)
      .pipe(
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${newPage}`)),
        tap(() => this.router.navigate([], { queryParams: { page: newPage } })),
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
