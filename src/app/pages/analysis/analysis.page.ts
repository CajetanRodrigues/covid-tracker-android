import { DataService } from '../../providers/data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {

  @ViewChild('barChart', {static: false}) barChart;
  @ViewChild('comparison', {static: false}) comparison;


  bars: any;
  colorArray: any;
  countryData: any = [];
  countryNamesArray = [];
  countryDeathsArray = [];
  count = 0;
  spinnerFlag = true;
  global_confirmed: any;
  global_recovered: any;
  global_deaths: any;
  constructor(private data: DataService) {
    this.apiCall();
    setInterval(() => {
      setTimeout(() => {
        this.countryData = [];
        this.countryDeathsArray = [];
        this.countryNamesArray = [];
        this.apiCall();
      }, 5000);
    }, 21600000);
  }
  apiCall() {
    this.data.fetchGlobalData()
      .subscribe((data) => {
        this.global_confirmed = data.confirmed;
        this.global_recovered = data.recovered;
        this.global_deaths = data.deaths;
      });

    this.data.fetchCountryData()
      .subscribe((data) => {
          data.sort((a, b) => {
    return b.deaths.value - a.deaths.value;
  });
          console.log(data);
      });
    setTimeout(() => {
  this.createComparisonChart();
      }, 3000);


    setTimeout(() => {
        this.spinnerFlag = false;
        this.createBarChart();
      }, 3500);
  }
  ngOnInit() {
  }

  createBarChart() {
      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'horizontalBar',
        data: {
          labels: this.countryNamesArray,
          datasets: [{
            label: 'People Dead',
            data: this.countryDeathsArray,
            backgroundColor: 'rgb(255, 0, 0)', // array should have same number of elements as number of dataset
            borderColor: 'rgb(255, 0, 0)', // array should have same number of elements as number of dataset
            borderWidth: 2
          }]
        },
        options: {
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

    createComparisonChart() {
      this.bars = new Chart(this.comparison.nativeElement, {
        type: 'doughnut',
        data: {
          labels: [
            'Confirmed',
            'Deaths',
            'Recovered'
        ],
          datasets: [{
            backgroundColor: [
              '#f1c40f',
              '#e74c3c',
              '#9b59b6',            ],
            data: [this.global_confirmed, this.global_deaths, this.global_recovered],

          }]
        },
      });
    }
  }
