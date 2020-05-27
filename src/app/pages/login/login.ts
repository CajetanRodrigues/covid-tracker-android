import { DataService } from './../../providers/data.service';
import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController, LoadingController, Platform, AlertController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { MenuController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  userData: any = {};

  submitted = false;
  msg: string;
  googleData: any;
  FB_APP_ID = 2665477543736775;
  facebookData: any = {};
  gmail = 'yo';
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  isLoggedIn: boolean;
  nativeStorageImage: any;
  showMenuFlag = false;
  constructor(
    public router: Router,
    public toastController: ToastController,
    private googlePlus: GooglePlus,
    private fb: Facebook,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public menu: MenuController,
    private storage: Storage,
    private dataService: DataService
  ) {
    this.dataService.locations.subscribe((data: boolean) => {
      this.menu.enable(false);
    })
    this.menu.enable(false);
  }
  googleSignIn() {
    this.googlePlus.login({})
      .then(result => this.userData = result)
      .catch(err => this.userData = `Error ${JSON.stringify(err)}`);
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      color: 'light',
      animated: true,
      mode: 'ios'
    });
    toast.present();
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
  // googleLogin() {
  //   this.googlePlus.login({})
  // .then((user: any) => {
  //   this.userData = user;
  //   // this.storage.set('google_user', 'true');
  //   // this.storage.set('gname', user.displayName);
  //   // this.storage.set('gemail', user.email);
  //   // this.storage.set('gimage', user.imageUrl);
  //   // this.dataService.email = user.email;
  //   // this.dataService.name = user.displayName;
  //   // this.dataService.image = user.imageUrl;
  //   this.gmail = user.email;
  //     })
  // .catch(err => console.error(err));
  // }
  login() {

    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;
        this.isLoggedIn = true;
        this.storage.set('gimage', res.imageUrl);
        this.storage.set('gname', res.displayName);
        this.storage.set('gemail', res.email);

        this.dataService.setTabsShowProperty(true);

      })
      .then(() => {
        this.router.navigateByUrl('district');
      })
      .catch(err => this.router.navigateByUrl('login'));
  }
async doFbLogin() {
    const loading = await this.loadingController.create({
          message: 'Please wait...',
          duration: 2000
    });
    this.presentLoading(loading);


    this.fb.login(['public_profile', 'email'])
  .then((res: FacebookLoginResponse) => {console.log('Logged into Facebook!', res);
                                         this.facebookData = res; })
  .catch(e => console.log('Error logging into Facebook', e));
  }

  async presentLoading(loading) {
  return await loading.present();
  }
}
