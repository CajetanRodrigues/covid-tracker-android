import { DataService } from '../../providers/data.service';
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

  constructor(public modalController: ModalController,
              private router: Router,
              public routerOutlet: IonRouterOutlet,
              private modalCtrl: ModalController,
              private data: DataService,
              private vibration: Vibration) {
   }
  ngOnInit() {

  }
  vibrate() {
    this.vibration.vibrate(100);
  }
  // searchLiveData() {
  //   if (this.searchValue === '') {
  //     this.countryData = this.backupCountryArray;
  //   }
  //   this.countryData = this.countryData.filter((country) => {
  //     return country.country_name.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1;
  //   });
  // }
  // async presentModal(country: any) {
  //   this.vibrate();
  //   const modal = await this.modalController.create({
  //     component: AboutPage,
  //     componentProps: {
  //       Country: country
  //     }
  //   });
  //   return await modal.present();
  // }
}
