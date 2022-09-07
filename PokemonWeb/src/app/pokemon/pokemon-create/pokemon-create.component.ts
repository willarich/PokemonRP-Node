import {Component} from "@angular/core";
import {PokemonModel} from "../pokemon.model";
import {NgForm} from "@angular/forms";
import {PokemonService} from "../pokemon.service";

@Component({
  selector: 'app-pokemon-create',
  templateUrl: './pokemon-create.component.html',
  styleUrls:['./pokemon-create.component.css']
})
export class PokemonCreateComponent {

  constructor(public pokemonService: PokemonService) {
  }
  onAddPokemon(form:NgForm) {
    if (form.invalid){
      return;
    }
    const pokemon: PokemonModel = {
      id: '',
      name: form.value.name,
      description:form.value.description
    };
    this.pokemonService.addPokemon(pokemon);
    form.resetForm();
  }
}
