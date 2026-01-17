import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonList } from '../../pokemons/components/pokemon-list/pokemon-list';
import { PokemonListSkeleton } from './ui/pokemon-list-skeleton/pokemon-list-skeleton';
import { PokemonsService } from '../../pokemons/services/pokemons';
import { tap } from 'rxjs';
import { SimplePokemon } from '../../pokemons/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonList, PokemonListSkeleton],
  templateUrl: './pokemons-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPage implements OnInit {
  private readonly pokemonsService = inject(PokemonsService);

  public pokemons = signal<SimplePokemon[]>([]);

  private readonly title = inject(Title);

  ngOnInit() {
    this.loadPokemons();
  }

  public loadPokemons(page = 0) {
    this.pokemonsService
      .loadPage(page)
      .pipe(tap(() => this.title.setTitle(`Pokémons SSR - Page ${page}`)))
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }
}
