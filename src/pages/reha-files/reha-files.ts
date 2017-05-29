import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ShowdataPage } from '../showdata/showdata'

/*
  Generated class for the RehaFiles page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reha-files',
  templateUrl: 'reha-files.html'
})
export class RehaFilesPage {




  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RehaFilesPage');
  }

  launch(url) {


    let options = [
      'enableViewportScale=yes',
      'location=no',
      'closebuttoncaption=zurück zur App'
    ];

    const browser = this.iab.create(url, '_blank', options.join());
    browser.show();

  }
}

