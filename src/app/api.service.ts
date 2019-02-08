import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

import { Observable } from  "rxjs";
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

import { HttpClient } from '@angular/common/http';
import { HttpParams} from  "@angular/common/http";
import { HttpHeaders } from  "@angular/common/http";
import { City } from './city';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {}

  public getCities(key: string): Observable<City[]>{
    const  params = new  HttpParams().set('key', key);
    const  headers = new  HttpHeaders().set("X-CustomHttpHeader", "CUSTOM_VALUE");
    return this.httpClient
                  .get<City[]>(`${API_URL}/cities`, {headers: headers, params: params})
                  .pipe(
                    debounceTime(500), 
                    map(
                      (data: any) => {
                          return (
                              data.length != 0 ? data as any[] : [{"City": "No Record Found"} as any]
                          );
                      })
                  )
                  .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
