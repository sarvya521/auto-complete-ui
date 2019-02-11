import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

import { ApiService} from "./api.service";

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
   providers: [ApiService]
})
export class AppComponent {
   title = 'auto-complete-ui';
   searchCity :  FormControl = new FormControl();
   cities = <any>[];
   currentCity;
   constructor(private apiService: ApiService) { }

   ngOnInit () {
      this.searchCity.valueChanges.subscribe(
         key => {
           if (key != '' && this.doKeyExists(key) === false) {
             this.apiService.getCities(key).subscribe(
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