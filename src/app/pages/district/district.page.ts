import { Covid19Service } from './../../providers/covid19.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-district',
  templateUrl: './district.page.html',
  styleUrls: ['./district.page.scss'],
})
export class DistrictPage implements OnInit {

  districts = []
  spinnerFlag = true;
  constructor(private covid19 : Covid19Service) {
    this.covid19.fetchDistrictData()
    .subscribe((data) => {
      console.log(data);
      this.districts = data;
    })
    setTimeout(() => {
      this.spinnerFlag = false;
    },1500)
   }

  ngOnInit() {
  }

}
