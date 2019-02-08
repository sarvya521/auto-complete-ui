import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

import { ApiService} from "./api.service";

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'auto-complete-ui';
   searchCity :  FormControl = new FormControl();
   states = <any>[];
   cities = <any>[];
   constructor(private apiService: ApiService) { this.loadStates(); }

   ngOnInit () {
      this.searchCity.valueChanges.subscribe(
         key => {
           if (key != '') {
             this.apiService.getCities(key).subscribe(
               data => {
                 this.cities = data as any[];
             })
           }
       })
   }
   
   //build list of states as map of key-value pairs
   loadStates() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
         Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
         Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
         Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
         North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
         South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
         Wisconsin, Wyoming';
      this.states =  allStates.split(/, +/g).map( function (state) {
         return {
            value: state.toUpperCase(),
            display: state
         };
      });
   }
}