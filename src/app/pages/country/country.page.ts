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


  constructor(private covid19: Covid19Service) {
    this.covid19.fetchCountryData('IN')
      .subscribe((data) => {
        console.log(data);
        this.confirmed = data.confirmed.value;
        this.deaths = data.deaths.value;
        this.recovered = data.deaths.value;
      });
  }

  ngOnInit() {
  }

}
