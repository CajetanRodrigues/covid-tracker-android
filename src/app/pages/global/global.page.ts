import { Covid19Service } from './../../providers/covid19.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-global',
  templateUrl: './global.page.html',
  styleUrls: ['./global.page.scss'],
})
export class GlobalPage implements OnInit {
  global_confirmed: any;
  global_recovered: any;
  global_deaths: any;

  constructor(private covid19: Covid19Service,
    private storage: Storage) {
      this.apiCall();
      // Update after every 6 hours
      setInterval(() => {
        this.apiCall();
      },21600000);
   }
  apiCall() {
    this.covid19.fetchGlobal()
    .subscribe((data) => {
      this.storage.set('global_confirmed', data.confirmed.value);
      this.storage.set('global_recovered', data.recovered.value);
      this.storage.set('global_deaths', data.deaths.value);

    });
  }
  ngOnInit() {
    this.storage.get('global_confirmed').then((val) => {
      console.log('Your age is', val);
      this.global_confirmed = val;
    });
    this.storage.get('global_recovered').then((val) => {
      this.global_recovered = val;
      console.log('Your age is', val);
    });
    this.storage.get('global_deaths').then((val) => {
      this.global_deaths = val;
      console.log('Your age is', val);
    });
}
}
