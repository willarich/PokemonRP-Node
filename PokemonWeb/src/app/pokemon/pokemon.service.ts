import {PokemonModel} from "./pokemon.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class PokemonService {
  private pokemonList: PokemonModel[] = [];
  private pokemonUpdated = new Subject<PokemonModel[]>();

  constructor(private http: HttpClient) {
  }

  getPokemon() {
    this.http.get<{ message: string, pokemon: PokemonModel[] }>('http://localhost:3000/api/pokemon')
      .subscribe((pokemonData) => {
        this.pokemonList = pokemonData.pokemon;
        this.pokemonUpdated.next([...this.pokemonList]);
      });
  }

  getPokemonUpdateListener() {
    return this.pokemonUpdated.asObservable();
  }

  addPokemon(newPokemon: PokemonModel) {
    this.http.post<{message: string}>('http://localhost:3000/api/pokemon', newPokemon)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.pokemonList.push(newPokemon);
        this.pokemonUpdated.next([...this.pokemonList]); //JS arrays are reference type. This syntax creates a value copy of the array.
      })
  }
}
