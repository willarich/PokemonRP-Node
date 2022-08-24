import {Component, OnDestroy, OnInit} from "@angular/core";
import {PokemonModel} from "../pokemon.model";
import {PokemonService} from "../pokemon.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})

export class PokemonListComponent implements OnInit, OnDestroy {
  pokemon: PokemonModel[] = [];
  private pokemonSub: Subscription;

  constructor(public pokemonService: PokemonService) {
    this.pokemonSub = new Subscription();
  }

  ngOnInit() {
    this.pokemon = this.pokemonService.getPokemon();
    this.pokemonSub = this.pokemonService.getPokemonUpdateListener()
      .subscribe((pokemon:PokemonModel[]) => {
          this.pokemon = pokemon;
        });
  }

  ngOnDestroy() {
    this.pokemonSub.unsubscribe();
  }

}
