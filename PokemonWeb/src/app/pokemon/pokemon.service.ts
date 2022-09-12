import {PokemonModel} from "./pokemon.model";
import {Injectable} from "@angular/core";
import {map, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class PokemonService {
  private pokemonList: PokemonModel[] = [];
  private pokemonUpdated = new Subject<PokemonModel[]>();

  constructor(private http: HttpClient) {
  }

  getPokemons() {
    this.http.get<{ message: string, pokemon: any }>('http://localhost:3000/api/pokemon')
      .pipe(map((pokemonData) => {
        return pokemonData.pokemon.map((pokemon: any) => {
          return {
            name: pokemon.name,
            description: pokemon.description,
            id: pokemon._id
          }
        })
      }))
      .subscribe((pokemonList) => {
        this.pokemonList = pokemonList;
        this.pokemonUpdated.next([...this.pokemonList]);
      });
  }
  getPokemon(id:string){
    return {...this.pokemonList.find(p => p.id === id)}//... is spread operator. Creates a clone of the list
  }

  getPokemonUpdateListener() {
    return this.pokemonUpdated.asObservable();
  }

  addPokemon(newPokemon: PokemonModel) {
    this.http.post<{message: string, pokemonId:string}>('http://localhost:3000/api/pokemon', newPokemon)
      .subscribe((responseData) => {
        newPokemon.id = responseData.pokemonId;
        this.pokemonList.push(newPokemon);
        this.pokemonUpdated.next([...this.pokemonList]); //JS arrays are reference type. This syntax creates a value copy of the array.
      })
  }

  deletePokemon(pokemonId: string){
    this.http.delete('http://localhost:3000/api/pokemon/' + pokemonId)
      .subscribe(() => {
        this.pokemonList = this.pokemonList.filter(pokemon => pokemon.id != pokemonId)
        this.pokemonUpdated.next([...this.pokemonList]);
      });
  }
}
