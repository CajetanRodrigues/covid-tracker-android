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
                this.covid19.fetchCovidLive().subscribe((data) => {
                  console.log(data);
                  this.countries = data.Countries;
                  this.countries.sort((a, b) => {
                    return b.TotalConfirmed - a.TotalConfirmed;
                  });
                  // this.global = data.Global

                });
                this.covid19.fetchGlobal()
                .subscribe((data) => {
                  // console.log(data)
                  this.global_confirmed = data.confirmed.value;
                  this.global_recovered = data.recovered.value;
                  this.global_deaths = data.deaths.value;
                });
                this.covid19.fetchCountries().subscribe((data: any) => {
                  console.log(data.countries.length);
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
    console.log(this.countryData);
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
    console.log(country);
    const modal = await this.modalController.create({
      component: AboutPage,
      componentProps: {
        Country: country
      }
    });
    return await modal.present();
  }
}
