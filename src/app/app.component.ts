import { DataService } from './providers/data.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Component, OnInit, ViewEncapsulation, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, DoCheck{
  tabsShow = false;
  appPages = [
    {
      title: 'State Level',
      url: 'district',
      icon: 'location'
    },
    {
      title: 'Country Level',
      url: 'country',
      icon: 'map'
    },
    {
      title: 'Global Level',
      url: 'global',
      icon: 'planet'
    },
    {
      title: 'Analysis',
      url: 'analysis',
      icon: 'bar-chart'
    },
    {
      title: 'Profile',
      url: 'profile',
      icon: 'person-circle'
    }
  ];
  loggedIn = false;
  dark = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private vibration: Vibration,
    private network: Network,
    public alertController: AlertController,
    private googlePlus: GooglePlus,
    private dataService: DataService
  ) {
    this.storage.get('dark').then((val) => {
      if(val === 'true') {
        this.dark = true;
      }
      else {
        this.dark = false;
      }
    })
    this.initializeApp();
    // watch network for a disconnection
    const disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.presentAlert();

    });
    const connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
    
  }
  ngDoCheck() {
    this.dataService.locations.subscribe((val: boolean) => {
      console.log('yooooo');
      console.log(val);
      this.tabsShow = val;
    });
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No Internet Connection!',
      subHeader: 'Connectivity Issue!',
      message: 'Please connect to a network & pull to refresh',
      buttons: ['OK']
    });

    await alert.present();
  }
  darkMode() {
    this.storage.set('dark',true);
  }
  vibrate() {
    this.vibration.vibrate(10);
  }
  logout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.storage.set('gname', '');
        this.storage.set('gemail', '');
        this.storage.set('gimage', '');
      }).then(() => {
        this.dataService.setTabsShowProperty(false);
        this.router.navigateByUrl('login');
      })
      .catch(err => console.error(err));
  }
  async ngOnInit() {

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
}
