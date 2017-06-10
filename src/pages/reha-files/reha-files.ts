import { Component } from '@angular/core';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { UserService } from '../../providers/user/user.service';

import firebase from 'firebase';

@Component({
  selector: 'page-reha-files',
  templateUrl: 'reha-files.html'
})
export class RehaFilesPage {

  public usersArray: any;

  constructor(private _user: UserService, private iab: InAppBrowser) {

    var myUserId = firebase.auth().currentUser.uid; // Authentifizierung
    var self = this;
    var ref = firebase.database().ref('newDef-SZB/' + myUserId + '/Broschüren'); // Pfad zu den Broschüren

    ref.on("value", function (snapshot) {
      console.log(snapshot.val());
    }, function (error) {
      console.log("Error: " + error.code);
    });

    // snapshot der Broschüren (Name der Klinik, pdf-Adresse)
    ref.once('value').then(function (childSnapshot) {
      let rawList = [];
      childSnapshot.forEach(snap => {
        rawList.push({
          key: snap.key, // key = Name der Klinik
          childData: snap.val() // childData val = pdf-Adresse der Klinik
        });
      });
      self.usersArray = rawList;
      console.log(rawList);
    });
  }

  // console.log
  ionViewDidLoad() {
    console.log('ionViewDidLoad RehaFilesPage');
  }

  // InAppBrowser
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