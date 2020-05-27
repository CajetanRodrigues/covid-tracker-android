import { MenuController } from '@ionic/angular';
import { DataService } from './../../providers/data.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  gemail = '';
  gimage = '';
  gname = '';

  constructor(private storage: Storage, private dataService: DataService, private menu: MenuController) {
    this.menu.enable(true);
    storage.get('gemail').then((val) => {
      this.gemail = val;
    });
    storage.get('gimage').then((val) => {
      this.gimage = val;
    });
    storage.get('gname').then((val) => {
      this.gname = val;
    });
   }
  ngOnInit() {
   
  }

}
