import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from '../../providers/data.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: false}) content: IonContent;
  confirmed: any;
  recovered: any;
  deaths: any;
  stateArray = [];
  spinnerFlag = true;
  sortToggleflag = false;
  dynamicStateArray: any = [];
  event:any;
  constructor(private data: DataService) {

    this.apiCall();
    setTimeout(() => {
      this.spinnerFlag = false;
    }, 1500);

    // Update after every 6 hours
    // setInterval(() => {
    //   this.apiCall();
    // }, 21600000 );
  }
  sortToggle(param) {

    if (param === 'recovered') {
      console.log('yo');
      if (this.sortToggleflag) {
        this.stateArray.sort((a, b) => {
          return b.recoveries - a.recoveries;
        });
        this.dynamicStateArray = this.stateArray.slice(0,this.dynamicStateArray.length-1);

        this.sortToggleflag = false;
      } else {
        this.stateArray.sort((a, b) => {
          return a.recoveries - b.recoveries;
        });
        this.dynamicStateArray = this.stateArray.slice(0,this.dynamicStateArray.length-1);

        this.sortToggleflag = true;
      }
  }

    if (param === 'deaths') {
    console.log('yo');
    if (this.sortToggleflag) {
      this.stateArray.sort((a, b) => {
        return b.deaths - a.deaths;
      });
      this.dynamicStateArray = this.stateArray.slice(0,this.dynamicStateArray.length-1);

      this.sortToggleflag = false;
    } else {
      this.stateArray.sort((a, b) => {
        return a.deaths - b.deaths;
      });
      this.dynamicStateArray = this.stateArray.slice(0,this.dynamicStateArray.length-1);

      this.sortToggleflag = true;
    }
}

    if (param === 'totalCases') {
      if (this.sortToggleflag) {
        this.stateArray.sort((a, b) => {
          return b.totalCases - a.totalCases;
        });
        this.dynamicStateArray = this.stateArray.slice(0,this.dynamicStateArray.length-1);

        this.sortToggleflag = false;
        console.log(this.sortToggleflag);
      } else {
        this.stateArray.sort((a, b) => {
          return a.totalCases - b.totalCases;
        });
        this.dynamicStateArray = this.stateArray.slice(0,this.dynamicStateArray.length-1);

        this.sortToggleflag = true;
        console.log(this.sortToggleflag);

      }
    }



}
  apiCall() {
    this.data.fetchstateData()
    .subscribe((data) => {
      console.log(data);
      data.sort((a, b) => {
        return b.totalCases - a.totalCases;
      });
      this.stateArray = data;
      this.dynamicStateArray = data.slice(0,10);

    });
    this.data.fetchCountry()
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
  loadData(event) {
    this.event = event;
    console.log(this.dynamicStateArray)
    let count = 1;
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      let dynamicIndex = this.dynamicStateArray.length-1;
      while (this.dynamicStateArray.length < this.stateArray.length && count<=12) {
        dynamicIndex++;
        this.dynamicStateArray.push(this.stateArray[dynamicIndex]);
        count++;
      }
      if (this.dynamicStateArray.length === this.stateArray.length) {
        event.target.disabled = true;
      }
    }, 300);
  }
  ionViewWillLeave() {
console.log("left");
this.event.target.disabled = false
this.dynamicStateArray = this.stateArray.slice(0,10);
  }
  ionViewWillEnter() {
    this.content.scrollToTop(500);
  }
}
