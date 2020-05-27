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
export class DataService {
  countryArray: any[];
  email: any;
  name: any;
  image: any;
  locations = new Observable();
  constructor(private http: HttpClient) { }

  fetchCountryData(): Observable<any> {
    return this.http.get<any>
      ('http://13.127.91.5:8082/countries', httpOptions);
  }
  fetchstateData(): Observable<any> {
    return this.http.get<any>
      ('http://13.127.91.5:8082/states', httpOptions);
  }
  fetchDistrictData(): Observable<any> {
    return this.http.get<any>
      ('http://13.127.91.5:8082/districts', httpOptions);
  }
  fetchGlobalData(): Observable<any> {
    return this.http.get<any>
      ('http://13.127.91.5:8082/global', httpOptions);
  }
  fetchState(): Observable<any> {
    return this.http.get<any>
      ('http://13.127.91.5:8082/state', httpOptions);
  }
  fetchCountry(): Observable<any> {
    return this.http.get<any>
      ('http://13.127.91.5:8082/country', httpOptions);
  }
  setTabsShowProperty(tabsShow: boolean) {
    this.locations = new Observable((observer) => {
      observer.next(tabsShow);
    });
  }
}
