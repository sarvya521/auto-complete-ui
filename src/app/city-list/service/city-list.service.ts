import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { Observable } from  "rxjs";
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

import { HttpClient } from '@angular/common/http';
import { HttpParams} from  "@angular/common/http";
import { HttpHeaders } from  "@angular/common/http";
import { City } from '../model/city';

const API_URL = environment.apiUrl;
const MAX_RESULT = '3';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) {}

  public getCities(key: string): Observable<City[]>{
    const  params = new  HttpParams().set('start', key).set('atmost', MAX_RESULT);
    const  headers = new  HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    return this.httpClient
                  .get<City[]>(`${API_URL}/city`, {headers: headers, params: params})
                  .pipe(
                    debounceTime(500), 
                    map(
                      (data: any) => {
                          return (
                              data.length != 0 ? data as any[] : [{"name": "No Record Found"} as any]
                          );
                      })
                  );
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
