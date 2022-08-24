import {PokemonModel} from "./pokemon.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn:'root'})
export class PokemonService{
  private pokemonList: PokemonModel[] = [];
  private pokemonUpdated = new Subject<PokemonModel[]>();

  getPokemon(){
    return [...this.pokemonList]; //JS arrays are reference type. This syntax creates a value copy of the array.
  }

  getPokemonUpdateListener(){
    return this.pokemonUpdated.asObservable();
  }

  addPokemon(newPokemon:PokemonModel){
    this.pokemonList.push(newPokemon);
    this.pokemonUpdated.next([...this.pokemonList]);
  }
}
