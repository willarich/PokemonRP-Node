import {Component, OnInit} from "@angular/core";
import {PokemonModel} from "../pokemon.model";
import {NgForm} from "@angular/forms";
import {PokemonService} from "../pokemon.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-pokemon-create',
  templateUrl: './pokemon-create.component.html',
  styleUrls:['./pokemon-create.component.css']
})
export class PokemonCreateComponent implements OnInit{

  private mode = "create";
  private pokemonId: string | null;
  public pokemon!: PokemonModel;

  constructor(public pokemonService: PokemonService, public route: ActivatedRoute) {
    this.pokemonId = null;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if (paramMap.has("pokemonId")){
        this.mode = "edit";
        this.pokemonId = paramMap.get("pokemonId");
        this.pokemon = this.pokemonService.getPokemon(this.pokemonId!) as PokemonModel;
      }
      else {
        this.mode = "create";
        this.pokemonId = null;
      }
    });
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
