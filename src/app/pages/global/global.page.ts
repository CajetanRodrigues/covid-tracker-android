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
  stateArray = []
  spinnerFlag = true;
  constructor(private covid19: Covid19Service,
    private storage: Storage) {
      // console.log(this.console(err))
      
      this.apiCall();
      // Update after every 6 hoursE
      setInterval(() => {
        this.apiCall();
      },21600000);
      setTimeout(() => {
        this.spinnerFlag = false;
      },1500);
   }
  apiCall() {
    this.covid19.fetchGlobalData()
    .subscribe((data) => {
      this.storage.set('global_confirmed', data.confirmed);
      this.storage.set('global_recovered', data.recovered);
      this.storage.set('global_deaths', data.deaths);


      this.covid19.fetchstateData()
      .subscribe((data) => {
        console.log(data)
        this.stateArray = data;
      })
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
