import { ToastController, MenuController } from '@ionic/angular';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { UserOptions } from '../../interfaces/user-options';
import { AuthenticationService } from '../providers/authentication.service';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: any = { name: '', password: '', email: '' };
  submitted = false;

  constructor(
    public router: Router,
    private authentication: AuthenticationService,
    private toastController: ToastController,
    public menu: MenuController
  ) {
    this.menu.enable(true);
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      color: 'dark',
      animated: true,
      mode: 'ios'
    });
    toast.present();
  }
  // onSignup(form: NgForm) {
  //   this.submitted = true;
  //   if (form.valid) {
  //   this.authentication.signup(this.signup.name, this.signup.email, this.signup.password)
  //   .subscribe((data) => {
  //     if (data === true) {
  //       this.router.navigateByUrl('login');
  //     }
  //   });
  // } else {
  //   this.presentToast('Please check your credentials !');
  // }
  // }
  navigateToLogin() {
    this.router.navigateByUrl('login');
  }
}
