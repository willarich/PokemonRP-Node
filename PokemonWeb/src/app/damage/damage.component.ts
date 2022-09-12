import { Component, OnInit } from '@angular/core';
import {map, Subscription} from "rxjs";
import {DamageService} from "./damage.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-damage',
  templateUrl: './damage.component.html',
  styleUrls: ['./damage.component.scss']
})
export class DamageComponent implements OnInit {

  roll: string = "";
  rollMultiplier:number = 1
  effectiveness: string = "0";
  typeMultiplier:number = 7
  atkAdjustment: string = "0";
  atkMultiplier:number = 3
  defAdjustment: string = "0";
  defMultiplier:number = 3
  stab:string = "0";
  stabMultiplier:number = 3
  specialAtk:string = "0";
  specialMultiplier:number = 4
  otherAdjustment: string = "0";
  otherMultiplier:number = 2
  bonus20:number = 4
  bonus1:number = -4
  rollAdjusted?:string
  avgDamage:string = ""
  finalDamage:string = ""

  constructor(public damageService: DamageService) {
  }

  ngOnInit(): void {
  }

  onCalculate() {
    let number = +this.roll * this.rollMultiplier +
      +this.effectiveness * this.typeMultiplier +
      +this.atkAdjustment * this.atkMultiplier +
      +this.defAdjustment * this.defMultiplier  +
      +this.stab * this.stabMultiplier +
      +this.specialAtk * this.specialMultiplier  +
      +this.otherAdjustment * this.otherMultiplier;
    if (this.roll === "20"){
      number += this.bonus20;
    }
    if (this.roll === "1"){
      number += this.bonus1;
    }
    this.rollAdjusted = number.toString();
    const adjustedNumber = number * 3.5 / 7 - 2;
    this.avgDamage = adjustedNumber.toFixed(1);
    this.damageService.getDamage(adjustedNumber);
  }

  onRandomDice(){
    const number = Math.ceil(Math.random() * 20);
    this.roll = number.toString();
  }

  onReset(){
    this.roll = ""
    this.effectiveness = "0"
    this.atkAdjustment="0"
    this.defAdjustment="0"
    this.stab="0"
    this.specialAtk="0"
    this.otherAdjustment="0"
    this.avgDamage = ""
  }


}
