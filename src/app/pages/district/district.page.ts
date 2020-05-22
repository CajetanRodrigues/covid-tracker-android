import { DataService } from '../../providers/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-district',
  templateUrl: './district.page.html',
  styleUrls: ['./district.page.scss'],
})
export class DistrictPage implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent, {static: false}) content: IonContent;

  districtArray = []
  spinnerFlag = true;
  confirmed: any;
  deaths: any;
  recovered: any;
  sortToggleflag = false;
  stateArray: any;
  dynamicDistrictArray = []
  event: any;
  constructor(private data : DataService) {
   
    setTimeout(() => {
      this.spinnerFlag = false;
    },1500)
    this.apiCall();
   }
   apiCall() {
     this.data.fetchState()
     .subscribe((data) => {
       this.confirmed = data.totalCases;
       this.deaths = data.deaths;
       this.recovered = data.recoveries;
     });
     this.data.fetchDistrictData()
     .subscribe((data) => {
       this.dynamicDistrictArray = data.slice(0,10);
       console.log(this.dynamicDistrictArray)
       this.districtArray = data;
       
       console.log(this.districtArray)
     })
   }
  ngOnInit() {
  }
  sortToggle(param) {

    if (param === 'recovered') {
      console.log('yo');
      if (this.sortToggleflag) {
        this.districtArray.sort((a, b) => {
          return b.recovered - a.recovered;
        });
        this.dynamicDistrictArray = this.districtArray.slice(0,this.dynamicDistrictArray.length-1);

        this.sortToggleflag = false;
        console.log(this.sortToggleflag);

      } else {
        this.districtArray.sort((a, b) => {
          return a.recovered - b.recovered;
        });
        this.dynamicDistrictArray = this.districtArray.slice(0,this.dynamicDistrictArray.length-1);

        this.sortToggleflag = true;
        console.log(this.sortToggleflag);

      }
  }

    if (param === 'deaths') {
    console.log('yo');
    if (this.sortToggleflag) {
      this.districtArray.sort((a, b) => {
        return b.deaths - a.deaths;
      });
      this.dynamicDistrictArray = this.districtArray.slice(0,this.dynamicDistrictArray.length-1);

      this.sortToggleflag = false;
    } else {
      this.districtArray.sort((a, b) => {
        return a.deaths - b.deaths;
      });
      this.dynamicDistrictArray = this.districtArray.slice(0,this.dynamicDistrictArray.length-1);

      this.sortToggleflag = true;
    }
}

    if (param === 'totalCases') {
      if (this.sortToggleflag) {
        this.districtArray.sort((a, b) => {
          return b.totalCases - a.totalCases;
        });
        this.dynamicDistrictArray = this.districtArray.slice(0,this.dynamicDistrictArray.length-1);

        this.sortToggleflag = false;
        console.log(this.sortToggleflag);
      } else {
        this.districtArray.sort((a, b) => {
          return a.totalCases - b.totalCases;
        });
        this.dynamicDistrictArray = this.districtArray.slice(0,this.dynamicDistrictArray.length-1);

        this.sortToggleflag = true;
        console.log(this.sortToggleflag);

      }
    }
  }
  loadData(event) {
    console.log(this.dynamicDistrictArray)
    let count = 1;
    this.event = event;
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      let dynamicIndex = this.dynamicDistrictArray.length-1;
      while (this.dynamicDistrictArray.length < this.districtArray.length && count<=12) {
        dynamicIndex++;
        this.dynamicDistrictArray.push(this.districtArray[dynamicIndex]);
        count++;
      }
      if (this.dynamicDistrictArray.length === this.districtArray.length) {
        event.target.disabled = true;
      }
    }, 300);
  }
  ionViewWillLeave() {
    console.log("left");
    this.event.target.disabled = false
    this.dynamicDistrictArray = this.stateArray.slice(0,10);
      }
      ionViewWillEnter() {
        this.content.scrollToTop(500);
      }
}
