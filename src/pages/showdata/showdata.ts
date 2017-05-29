import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { UserService } from '../../providers/user/user.service';

import firebase from 'firebase';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
	selector: 'page-showdata',
	templateUrl: 'showdata.html'
})
export class ShowdataPage implements OnInit {

	// firestore = firebase.database();
	public usersArray: any;
	public authStatus: boolean;
	public hasDoc: boolean;
	private isAuth: BehaviorSubject<boolean>;
	users: FirebaseListObservable<any[]>;

	// private userDisplayName: any;
	// private displayUserName: any;
	// private displayName: any;

	private displayKostengutsprache: any;
	private displayFallnummer: any;
	private displayBroschueren1: any;
	private displayBroschueren2: any;
	private displayBroschueren3: any;




	ionViewDidLoad() {
		console.log('ionViewDidLoad ShowdataPage');

		this._user.auth.onAuthStateChanged(user => {
			this.isAuth.next(!!user);
			this._cd.detectChanges();
		});
	}

	constructor(public alertCtrl: AlertController, private iab: InAppBrowser, db: AngularFireDatabase, public navCtrl: NavController,
		public navParams: NavParams, private _user: UserService, private _cd: ChangeDetectorRef) {

		// this.navCtrl = navCtrl;
		this.isAuth = new BehaviorSubject(false);
		var myUserId = firebase.auth().currentUser.uid;
		this.displayUser(myUserId);
		this.isAuth.subscribe(val => this.authStatus = val);

		// var self = this;

		// var ref = this.firestore.ref('/Spitalzentrum Biel SZB/' + userId);
		// ref.once('value').then(function (snapshot) {
		// 	// We need to create this array first to store our local data
		// 	let rawList = [];
		// 	snapshot.forEach(snap => {
		// 		rawList.push({
		// 			id: snap.key,
		// 			Fallnummer: snap.val().Fallnummer,
		// 			Kogu_Status: snap.val().Kogu_Status
		// 		});
		// 	});

		// 	self.usersArray = rawList;
		// });
	}

	displayUser(theUserId) {

		// var self = this;

		var that = this;
		this._user.viewUser(theUserId).then(snapshot => {
			// let rawList = [];
			// snapshot.forEach(snap => {
			// rawList.push({
			snapshot.key,

				// username: snapshot.val().username || "unbearbeitet",
				// username: snap.val().username,
				// name: snapshot.val().name

				// that.userDisplayName = snapshot.val().broschüre.Fallnummer
				// that.displayUserName = snapshot.val().username,
				// that.displayName = snapshot.val().name

				that.displayFallnummer = snapshot.val().Fallnummer,
				that.displayKostengutsprache = snapshot.val().Kostengutsprache,
				that.displayBroschueren1 = snapshot.val().Broschüren.Klinik1,
				that.displayBroschueren3 = snapshot.val().Broschüren.Klinik3,
				that.displayBroschueren2 = snapshot.val().Broschüren.Klinik2


		});

		this._user.viewUser(theUserId).then(snapshot => {
			let arr = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				arr.push({

					Klinik1: snapshot.val().displayBroschueren1,
					Klinik2: snapshot.val().displayBroschueren2,
					Klinik3: snapshot.val().displayBroschueren3


				});

			}


		});

		// });

		// });



		// self.usersArray = rawList;
		// });

		// open(url) {

		// 			let options = [
		// 				'enableViewportScale=yes',
		// 				'location=no',
		// 				// 'toolbar=yes', 
		// 				'closebuttoncaption=zurück zur App'
		// 			];
		// 			const browser = this.iab.create(url, '_blank', options.join());
		// 			browser.show();


		// 		}

	}
	ngOnInit() { }

}















// import { Component, OnInit } from '@angular/core';
// import { NavController, NavParams, AlertController } from 'ionic-angular';

// import { ChangeDetectorRef } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/Rx';

// import { UserService } from '../../providers/user/user.service';

// import firebase from 'firebase';

// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


// @Component({
// 	selector: 'page-showdata',
// 	templateUrl: 'showdata.html'
// })
// export class ShowdataPage implements OnInit {

// 	firestore = firebase.database();
// 	public usersArray: any;
// 	public authStatus: boolean;
// 	private isAuth: BehaviorSubject<boolean>;
// 	// users: FirebaseListObservable<any[]>;


// 	ionViewDidLoad() {
// 		console.log('ionViewDidLoad ShowdataPage');

// 		this._user.auth.onAuthStateChanged(user => {
// 			this.isAuth.next(!!user);
// 			this._cd.detectChanges();
// 		});
// 	}

// 	constructor(public alertCtrl: AlertController, db: AngularFireDatabase, public navCtrl: NavController,
// 		public navParams: NavParams, private _user: UserService, private _cd: ChangeDetectorRef) {
// 		// this.users = db.list('/Spitalzentrum Biel SZB');
// 		this.navCtrl = navCtrl;
// 		this.isAuth = new BehaviorSubject(false);
// 		var userId = firebase.auth().currentUser.uid;
// 		this.isAuth.subscribe(val => this.authStatus = val);

// 		var self = this;

// 		var ref = this.firestore.ref('/Spitalzentrum Biel SZB/' + userId);
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

// 	ngOnInit() {
// 	}

// 	// addUser() {

// 	// 	let prompt = this.alertCtrl.create({
// 	// 		title: 'Name of user',
// 	// 		message: "Enter a name for this new user",
// 	// 		inputs: [
// 	// 			{
// 	// 				name: 'Name',
// 	// 				placeholder: 'Username'
// 	// 			},
// 	// 		],
// 	// 		buttons: [
// 	// 			{
// 	// 				text: 'Cancel',
// 	// 				handler: data => {
// 	// 					console.log('Cancel clicked');
// 	// 				}
// 	// 			},
// 	// 			{
// 	// 				text: 'Save',
// 	// 				handler: data => {
// 	// 					this.users.push({
// 	// 						// "title" ist der Name, den ich eingeben habe, als neuen User.
// 	// 						title: data.Name


// 	// 					});
// 	// 					console.log(this.usersArray);
// 	// 				}
// 	// 			}
// 	// 		]
// 	// 	});
// 	// 	prompt.present();
// 	// }
// }