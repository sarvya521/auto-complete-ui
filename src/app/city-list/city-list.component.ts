import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

import { CityService } from "./service/city-list.service";

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
  providers: [CityService]
})
export class CityListComponent implements OnInit {
  title = 'auto-complete-ui';
  searchCity :  FormControl = new FormControl();
  cities = <any>[];
  currentCity;
  constructor(private cityService: CityService) { }

  ngOnInit () {
    this.searchCity.valueChanges.subscribe(
       key => {
         if (key != '' && this.doKeyExists(key) === false) {
           this.cityService.getCities(key).subscribe(
             data => {
               this.cities = data as any[];
           })
         }
     })
 }

 doKeyExists(key) : boolean {
    if(this.cities.length > 0) {
       return this.cities.some(function(c){ return c.name === key});
    }
    return false;
 }

 getSelectedCity(city){
    this.currentCity = city;
    console.log("current selected city:"+city.name);
 }

}
