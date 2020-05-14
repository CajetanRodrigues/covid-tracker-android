import { Covid19Service } from './../../providers/covid19.service';
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
  constructor(private covid19: Covid19Service) {
    this.apiCall();
    setInterval(() => {
      setTimeout(() => {
        this.countryData = [];
        this.countryDeathsArray = [];
        this.countryNamesArray = [];
        this.apiCall();
      },5000);
    }, 21600000);
  }
  apiCall() {
    this.covid19.fetchGlobal()
      .subscribe((data) => {
        this.global_confirmed = data.confirmed.value;
        this.global_recovered = data.recovered.value;
        this.global_deaths = data.deaths.value;
      });
    setTimeout(() => {
  this.createComparisonChart();
      }, 3000);

    this.covid19.fetchCountries().subscribe((data: any) => {
        data.countries.forEach(country => {
          // console.log(country.iso3)
          this.covid19.fetchCountryData(country.iso3)
          .subscribe((countryData) => {
            // console.log(countryData)
            this.countryData.push(
              {
                country_name: country.name,
                ...countryData,
                country_code: country.iso2
              }
            );
            this.countryData.sort((a, b) => {
              return b.deaths.value - a.deaths.value;
            });
          });
        });

      });
    setTimeout(() => {
        this.countryData.forEach(element => {
          if ( this.count <= 5) {
          this.countryNamesArray.push(element.country_name);
          this.countryDeathsArray.push(element.deaths.value);
          this.count++;
          }
        });
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
