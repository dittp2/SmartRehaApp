import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../../providers/user/user.service';

import firebase from 'firebase';

@Component({
  selector: 'page-reha-files',
  templateUrl: 'reha-files.html'
})
export class RehaFilesPage {

  users: FirebaseListObservable<any[]>;

  firestore = firebase.database();
  public usersArray: any;
  public usersArray2: any;

  constructor(private _user: UserService, db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
    var myUserId = firebase.auth().currentUser.uid;

    var self = this;

    var ref2 = firebase.database().ref('newDef-SZB/' + myUserId + '/Broschüren');

    ref2.on("value", function (snapshot) {
      console.log(snapshot.val());
    }, function (error) {
      console.log("Error: " + error.code);
    });

    ref2.once('value').then(function (childSnapshot) {
      let rawList = [];

      childSnapshot.forEach(snap => {
        rawList.push({
          key: snap.key,
          childData: snap.val()
        });
      });

      self.usersArray = rawList;
      console.log(rawList);
    });

  }

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