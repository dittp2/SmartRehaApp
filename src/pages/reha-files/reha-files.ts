import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ShowdataPage } from '../showdata/showdata'

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { UserService } from '../../providers/user/user.service';

import firebase from 'firebase';

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

  users: FirebaseListObservable<any[]>;

  firestore = firebase.database();
  public usersArray: any;
  public usersArray2: any;


  constructor(private _user: UserService, db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
    var myUserId = firebase.auth().currentUser.uid;

    // 		// this.users = db.list('/Spitalzentrum Biel SZB');
    // 		this.navCtrl = navCtrl;
    // 		this.isAuth = new BehaviorSubject(false);
    // 		var userId = firebase.auth().currentUser.uid;
    // 		this.isAuth.subscribe(val => this.authStatus = val);

    var self = this;

    var ref = this.firestore.ref('/Spitalzentrum Biel SZB/Broschüren');
    var ref2 = firebase.database().ref('newDef-SZB/' + myUserId + '/Broschüren');

    ref2.on("value", function (snapshot) {
      console.log(snapshot.val());
    }, function (error) {
      console.log("Error: " + error.code);
    });

    // var broschuerenKey = broschueren.key;
    // console.log(broschuerenKey);


    // ref2.once('value').then(function (snapshot) {
    ref2.once('value').then(function (childSnapshot) {
      let rawList = [];

      childSnapshot.forEach(snap => {
        rawList.push({
          key: snap.key,
          childData: snap.val()
        });
      });
      // snapshot.forEach(function (childSnapshot) {

      //   var key = childSnapshot.key;
      //   var childData = childSnapshot.val();


      // rawList.push(key, + ": " + childData);

      // });

      self.usersArray = rawList;
      console.log(rawList);
    });



    // var self2 = this;

    // ref2.on("value", function (snapshot) {
    //   let rawList2 = [];
    //   rawList2.push(snapshot.val());
    //   // return rawList2;
    //   console.log(rawList2.values);

    // });



    // 		ref.once('value').then(function (snapshot) {
    // 			// We need to create this array first to store our local data
    // 			let rawList = [];
    // 			snapshot.forEach(snap => {
    // 				rawList.push({
    // 					id: snap.key,
    // 					Fallnummer: snap.val().Fallnummer,
    // 					Kogu_Status: snap.val().Kogu_Status
    // 				});
    // 			});

    // 			self.usersArray = rawList;
    // 		});
    // 	}

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

