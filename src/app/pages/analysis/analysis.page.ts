import { DataService } from '../../providers/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ActionSheetController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {

  @ViewChild('barChart', {static: false}) barChart;
  @ViewChild('confirmed', {static: false}) confirmed;
  @ViewChild('recovered', {static: false}) recovered;
  @ViewChild('comparison', {static: false}) comparison;

  propertySet = 'deaths';
  bars: any;
  colorArray: any;
  countryData: any = [];
  countryNamesArray = [];
  countryDeathsArray = [];
  count = 0;
  spinnerFlag = true;
  countryConfirmedArray: any = [];
  countryRecoveredArray: any = [];
  confirmedSorted = [];
  recoveredSorted = [];
  deathsSorted = [];
  constructor(private data: DataService, public actionSheetController: ActionSheetController, private menu: MenuController) {
    this.menu.enable(true);
    this.apiCall();
  }
  apiCall() {
    this.countryDeathsArray = [];
    this.countryNamesArray = [];
    this.countryConfirmedArray = [];
    this.countryRecoveredArray = [];

    // this.data.fetchGlobalData()
    //   .subscribe((data) => {
    //     this.global_confirmed = data.confirmed;
    //     this.global_recovered = data.recovered;
    //     this.global_deaths = data.deaths;
    //   });
    this.data.fetchCountryData()
    .subscribe((dataArray) => {
      console.log(dataArray)
      setTimeout(() => {
        this.deathsSorted  = dataArray.sort((a, b) => {
          return b.deaths - a.deaths;
        });
        this.recoveredSorted = dataArray.sort((a, b) => {
          return b.recovered - a.recovered;
        });
        this.confirmedSorted = dataArray.sort((a, b) => {
          return b.confirmed - a.confirmed;
        });

      }, 2000);


      setTimeout(() => {
          this.deathsSorted.forEach(element => {
              this.countryDeathsArray.push(element.deaths);
              this.countryNamesArray.push(element.name);
            });
          this.confirmedSorted.forEach(element => {
              this.countryConfirmedArray.push(element.confirmed);
            });
          this.recoveredSorted.forEach(element => {
                    this.countryRecoveredArray.push(element.recovered);
            });
      }, 6000);
    });
    setTimeout(() => {

      this.createBarChart('deaths');
      console.log(this.countryDeathsArray);
    }, 8000);

  }
  ngOnInit() {
  }

  createBarChart(property: string) {
    setTimeout(() => {


    this.spinnerFlag = false;
    if (property === 'deaths') {
      console.log('Reached here!');
      this.bars = new Chart(this.barChart.nativeElement, {
          type: 'horizontalBar',
          data: {
            labels: this.countryNamesArray,
            datasets: [{
              label: 'People Dead',
              data: this.countryDeathsArray,
              backgroundColor: 'rgb(255, 51, 51)', // array should have same number of elements as number of dataset
              borderColor: 'rgb(255, 51, 51)', // array should have same number of elements as number of dataset
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
    } else if (property === 'confirmed') {

    this.bars = new Chart(this.confirmed.nativeElement, {
          type: 'horizontalBar',
          data: {
            labels: this.countryNamesArray,
            datasets: [{
              label: 'People Confirmed',
              data: this.countryConfirmedArray,
              backgroundColor: 'rgb(255, 128, 0)', // array should have same number of elements as number of dataset
              borderColor: 'rgb(255, 128, 0)', // array should have same number of elements as number of dataset
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
    } else {
console.log('Reached here!');
this.bars = new Chart(this.recovered.nativeElement, {
          type: 'horizontalBar',
          data: {
            labels: this.countryNamesArray,
            datasets: [{
              label: 'People Recovered',
              data: this.countryRecoveredArray,
              backgroundColor: 'rgb(0,255, 0)', // array should have same number of elements as number of dataset
              borderColor: 'rgb(0,255, 0)', // array should have same number of elements as number of dataset
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
    }
  }, 1000);
  }
    // createComparisonChart() {
    //   this.bars = new Chart(this.comparison.nativeElement, {
    //     type: 'doughnut',
    //     data: {
    //       labels: [
    //         'Confirmed',
    //         'Deaths',
    //         'Recovered'
    //     ],
    //       datasets: [{
    //         backgroundColor: [
    //           '#f1c40f',
    //           '#e74c3c',
    //           '#9b59b6',            ],
    //         data: [this.global_confirmed, this.global_deaths, this.global_recovered],

    //       }]
    //     },
    //   });
    // }


    async presentActionSheet() {
      const actionSheet = await this.actionSheetController.create({
        header: 'View Top 10 in the category of',
        buttons: [{
          text: 'Recovered',
          icon: 'medkit-sharp',
          handler: () => {
            this.spinnerFlag = true;
            this.propertySet = 'recovered';
            this.createBarChart('recovered');
            console.log('recovered clicked');
          }
        }, {
          text: 'Confirmed',
          icon: 'sad-sharp',
          handler: () => {
            this.spinnerFlag = true;

            this.propertySet = 'confirmed';
            this.createBarChart('confirmed');
            console.log('confirmed clicked');
          }
        }, {
          text: 'Deaths',
          icon: 'skull-sharp',
          handler: () => {
            this.spinnerFlag = true;

            this.propertySet = 'deaths';
            this.createBarChart('deaths');
            console.log('deaths clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }

doRefresh(event) {
      this.apiCall();
      setTimeout(() => {
        event.target.complete();
      }, 2000);
    }
  }
