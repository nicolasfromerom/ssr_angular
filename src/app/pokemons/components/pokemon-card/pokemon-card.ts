import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCard {
  public pokemon = input.required<SimplePokemon>();

  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        this.pokemon().id
      }.png`
  );
}
