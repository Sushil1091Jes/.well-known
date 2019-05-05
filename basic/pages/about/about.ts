import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'basic-about'
})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  //public year : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    // let currentDate=new Date();
    // this.year = '©' + currentDate.getFullYear() + ' YTWO Formative';
   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
