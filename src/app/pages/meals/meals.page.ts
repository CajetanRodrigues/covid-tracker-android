import { Covid19Service } from './../../providers/covid19.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { AboutPage } from '../about/about';
import { Router, NavigationExtras } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  spinnerFlag = true;
  searchValue = '';
  backupCountryArray = [];
  countries: any = [];
  global_confirmed: any;
  global_recovered: any;
  global_deaths: any;
  countryData = [];
  constructor(public modalController: ModalController,
              private router: Router,
              public routerOutlet: IonRouterOutlet,
              private modalCtrl: ModalController,
              private covid19: Covid19Service,
              private vibration: Vibration) {
               this.apiCall();
               setInterval(() => {
                 this.countries = [];
                 this.countryData = [];
                 setTimeout(() => {
                  this.apiCall();
                 }, 5000);
               }, 21600000);
   }
   apiCall() {
    this.covid19.fetchCovidLive().subscribe((data) => {
      this.countries = data.Countries;
      this.countries.sort((a, b) => {
        return b.TotalConfirmed - a.TotalConfirmed;
      });
    });
    this.covid19.fetchGlobal()
    .subscribe((data) => {
      this.global_confirmed = data.confirmed.value;
      this.global_recovered = data.recovered.value;
      this.global_deaths = data.deaths.value;
    });
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
            return b.confirmed.value - a.confirmed.value;
          });
        });
      });

      this.backupCountryArray = this.countryData;
    });
   }
  ngOnInit() {
    setTimeout(() => {
      this.spinnerFlag = false;
      this.backupCountryArray = this.countryData;

    }, 4000);
    this.countryData.sort((a, b) => {
      return b.confirmed.value - a.confirmed.value;
    });
  }
  vibrate() {
    this.vibration.vibrate(100);
  }
  navigateToAddMeal() {
    this.router.navigateByUrl('add-meal');
  }
  searchLiveData() {
    if (this.searchValue === '') {
      this.countryData = this.backupCountryArray;
    }
    this.countryData = this.countryData.filter((country) => {
      return country.country_name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1;
    });
  }
  async presentModal(country: any) {
    this.vibrate();
    const modal = await this.modalController.create({
      component: AboutPage,
      componentProps: {
        Country: country
      }
    });
    return await modal.present();
  }
}
