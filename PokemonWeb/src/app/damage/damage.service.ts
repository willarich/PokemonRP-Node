import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class DamageService {

  constructor(private http: HttpClient) {
  }

  getDamage(value:number) {
    console.log("dsv " + value)
    this.http.get<{message: string, retNumber: number}>('http://localhost:3000/api/damage/' + value)
    //this.http.get('http://localhost:3000/api/damage/' + value)
      .subscribe((result) => {
        console.log("ds " + result.retNumber)
      });
  }
/*
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
  }*/
}
