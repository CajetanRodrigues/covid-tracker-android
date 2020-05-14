import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    {
      
    })
};
@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor(private http: HttpClient) { }
  fetchCovidLive(): Observable<any> {
    return this.http.get<any>
      ('https://api.covid19api.com/summary', httpOptions);
  }
  fetchGlobal(): Observable<any> {
    return this.http.get<any>
      ('https://covid19.mathdro.id/api/', httpOptions);
  }
  fetchCountries(): Observable<any> {
    return this.http.get<any>
      ('https://covid19.mathdro.id/api/countries', httpOptions);
  }
  fetchCountryData(code: string): Observable<any> {
    return this.http.get<any>
      ('https://covid19.mathdro.id/api/countries/' + code, httpOptions);
  }
}
