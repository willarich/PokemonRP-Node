import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from "./pokemon/pokemon-list/pokemon-list.component";
import {PokemonCreateComponent} from "./pokemon/pokemon-create/pokemon-create.component";
import {DamageComponent} from "./damage/damage.component";

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'create', component: PokemonCreateComponent },
  { path: 'edit/:pokemonId', component: PokemonCreateComponent },
  { path: 'damage', component: DamageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
