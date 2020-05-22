import { DataService } from '../../providers/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-global',
  templateUrl: './global.page.html',
  styleUrls: ['./global.page.scss'],
})
export class GlobalPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: false}) content: IonContent;

  spinnerFlag = true;
  sortToggleflag = false;
  countryArray = [];
  confirmed: any;
  deaths: any;
  recovered: any;
  dynamicGlobalArray: any = [];
  event: any;
  constructor(private data: DataService,
    private storage: Storage) {
      // console.log(this.console(err))
      
      this.apiCall();
      // Update after every 6 hoursE
      // setInterval(() => {
      //   this.apiCall();
      // },21600000);
      setTimeout(() => {
        this.spinnerFlag = false;
      },1500);
   }
  apiCall() {
    this.data.fetchGlobalData()
    .subscribe((data) => {
      this.confirmed = data.confirmed;
      this.deaths =  data.deaths;
      this.recovered = data.recovered;
    });
    this.data.fetchCountryData()
    .subscribe((data) => {
      console.log(data);
      this.countryArray = data;
      this.dynamicGlobalArray = data.slice(0,10);

    })
  }
  ngOnInit() {

}
sortToggle(param) {

  if (param === 'recovered') {
    console.log('yo');
    if (this.sortToggleflag) {
      this.countryArray.sort((a, b) => {
        return b.recovered - a.recovered;
      });
      this.dynamicGlobalArray = this.countryArray.slice(0,this.dynamicGlobalArray.length-1);

      this.sortToggleflag = false;
    } else {
      this.countryArray.sort((a, b) => {
        return a.recovered - b.recovered;
      });
      this.dynamicGlobalArray = this.countryArray.slice(0,this.dynamicGlobalArray.length-1);

      this.sortToggleflag = true;
    }
}

  if (param === 'deaths') {
  console.log('yo');
  if (this.sortToggleflag) {
    this.countryArray.sort((a, b) => {
      return b.deaths - a.deaths;
    });
    this.dynamicGlobalArray = this.countryArray.slice(0,this.dynamicGlobalArray.length-1);

    this.sortToggleflag = false;
  } else {
    this.countryArray.sort((a, b) => {
      return a.deaths - b.deaths;
    });
    this.dynamicGlobalArray = this.countryArray.slice(0,this.dynamicGlobalArray.length-1);

    this.sortToggleflag = true;
  }
}

  if (param === 'totalCases') {
    if (this.sortToggleflag) {
      this.countryArray.sort((a, b) => {
        return b.confirmed - a.confirmed;
      });
      this.dynamicGlobalArray = this.countryArray.slice(0,this.dynamicGlobalArray.length-1);
      this.sortToggleflag = false;
      console.log(this.sortToggleflag);
      console.log(this.countryArray)
    } else {
      this.countryArray.sort((a, b) => {
        return a.confirmed - b.confirmed;
      });
      this.dynamicGlobalArray = this.countryArray.slice(0,this.dynamicGlobalArray.length-1);
      this.sortToggleflag = true;
      console.log(this.sortToggleflag);
      console.log(this.countryArray)
    }
  }



}
loadData(event) {
  console.log(this.dynamicGlobalArray)
  let count = 1;
  this.event = event;
  setTimeout(() => {
    console.log('Done');
    event.target.complete();
    let dynamicIndex = this.dynamicGlobalArray.length-1;
    while (this.dynamicGlobalArray.length < this.countryArray.length && count<=12) {
      dynamicIndex++;
      this.dynamicGlobalArray.push(this.countryArray[dynamicIndex]);
      count++;
    }
    if (this.dynamicGlobalArray.length === this.countryArray.length) {
      event.target.disabled = true;
    }
  }, 300);
}

ionViewWillLeave() {
  console.log("left");
  this.event.target.disabled = false
  this.dynamicGlobalArray = this.countryArray.slice(0,10);
    }
    ionViewWillEnter() {
      this.content.scrollToTop(500);
    }

}
