import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { UserService } from '../../providers/user/user.service';

import firebase from 'firebase';

import { AngularFireDatabase } from 'angularfire2/database';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
	selector: 'page-showdata',
	templateUrl: 'showdata.html'
})
export class ShowdataPage implements OnInit {

	public usersArray: any;
	public usersArray2: any;
	public authStatus: boolean;
	public hasDoc: boolean;
	private isAuth: BehaviorSubject<boolean>;

	private displayFallnummer: any;
	private displayKostengutsprache: any;
	// private displayBroschueren1: any;
	// private displayBroschueren2: any;
	// private displayBroschueren3: any;
	// private displayBroschueren4: any;

	ionViewDidLoad() {
		console.log('ionViewDidLoad ShowdataPage');

		this._user.auth.onAuthStateChanged(user => {
			this.isAuth.next(!!user);
			this._cd.detectChanges();
		});
	}

	constructor(public alertCtrl: AlertController, private iab: InAppBrowser, db: AngularFireDatabase, public navCtrl: NavController,
		public navParams: NavParams, private _user: UserService, private _cd: ChangeDetectorRef) {

		this.isAuth = new BehaviorSubject(false);
		var myUserId = firebase.auth().currentUser.uid;
		this.displayUser(myUserId);
		this.isAuth.subscribe(val => this.authStatus = val);

		var self = this;

		var ref2 = firebase.database().ref('newDef-SZB/' + myUserId + '/Broschüren');

		ref2.once('value').then(function (childSnapshot) {
			let rawList = [];

			childSnapshot.forEach(snap => {
				rawList.push({
					key: snap.key,
					childData: snap.val()
				});
			});

			self.usersArray2 = rawList;
			console.log(rawList);
		});

	}

	displayUser(theUserId) {

		var that = this;
		this._user.viewUser(theUserId).then(snapshot => {
			snapshot.key,
				that.displayFallnummer = snapshot.val().Fallnummer,
				that.displayKostengutsprache = snapshot.val().Kostengutsprache
			// that.displayBroschueren1 = snapshot.val().Broschüren.Klinik1,
			// that.displayBroschueren2 = snapshot.val().Broschüren.Klinik2,
			// that.displayBroschueren3 = snapshot.val().Broschüren.Klinik3,
			// that.displayBroschueren4 = snapshot.val().Broschüren.Klinik4
		});
	}

	ngOnInit() { }
}