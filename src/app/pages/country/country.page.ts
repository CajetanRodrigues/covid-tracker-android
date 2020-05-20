import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../../providers/covid19.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {

  confirmed: any;
  recovered: any;
  deaths: any;
  stateArray = [];
  spinnerFlag = true;
  sortToggleflag = false;
  constructor(private covid19: Covid19Service) {

    this.apiCall();
    setTimeout(() => {
      this.spinnerFlag = false;
    }, 1500);

    // Update after every 6 hours
    setInterval(() => {
      this.apiCall();
    }, 21600000 );
  }
  sortToggle(param) {

    if (param === 'recovered') {
      console.log('yo');
      if (this.sortToggleflag) {
        this.stateArray.sort((a, b) => {
          return b.recoveries - a.recoveries;
        });
        this.sortToggleflag = false;
      } else {
        this.stateArray.sort((a, b) => {
          return a.recoveries - b.recoveries;
        });
        this.sortToggleflag = true;
      }
  }

    if (param === 'deaths') {
    console.log('yo');
    if (this.sortToggleflag) {
      this.stateArray.sort((a, b) => {
        return b.deaths - a.deaths;
      });
      this.sortToggleflag = false;
    } else {
      this.stateArray.sort((a, b) => {
        return a.deaths - b.deaths;
      });
      this.sortToggleflag = true;
    }
}

    if (param === 'totalCases') {
      if (this.sortToggleflag) {
        this.stateArray.sort((a, b) => {
          return b.totalCases - a.totalCases;
        });
        this.sortToggleflag = false;
        console.log(this.sortToggleflag);
      } else {
        this.stateArray.sort((a, b) => {
          return a.totalCases - b.totalCases;
        });
        this.sortToggleflag = true;
        console.log(this.sortToggleflag);

      }
    }



}
  apiCall() {
    this.covid19.fetchstateData()
    .subscribe((data) => {
      console.log(data);
      data.sort((a, b) => {
        return b.totalCases - a.totalCases;
      });
      this.stateArray = data;
    });
    this.covid19.fetchCountry()
    .subscribe((data) => {
      console.log(data);
      this.confirmed = data.confirmed;
      this.recovered = data.recovered;
      this.deaths = data.deaths;
      console.log(data.deaths);
    });
  }
  ngOnInit() {
  }

}
