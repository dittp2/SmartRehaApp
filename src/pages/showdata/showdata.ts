import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { UserService } from '../../providers/user/user.service';

import firebase from 'firebase';

@Component({
	selector: 'page-showdata',
	templateUrl: 'showdata.html'
})
export class ShowdataPage implements OnInit {

	firestore = firebase.database();
	public usersArray: any;
	public authStatus: boolean;
	private isAuth: BehaviorSubject<boolean>;

	ionViewDidLoad() {
		console.log('ionViewDidLoad ShowdataPage');

		this._user.auth.onAuthStateChanged(user => {
			this.isAuth.next(!!user);
			this._cd.detectChanges();
		});
	}

	constructor(public navCtrl: NavController, public navParams: NavParams, private _user: UserService, private _cd: ChangeDetectorRef) {

		this.navCtrl = navCtrl;
		this.isAuth = new BehaviorSubject(false);

		this.isAuth.subscribe(val => this.authStatus = val);

		var self = this;

		var ref = this.firestore.ref('/Spitalzentrum Biel SZB/');
		ref.once('value').then(function (snapshot) {
			// We need to create this array first to store our local data
			let rawList = [];
			snapshot.forEach(snap => {
				rawList.push({
					id: snap.key,
					Kogu_Status: snap.val().Kogu_Status
				});
			});

			self.usersArray = rawList;
		});
	}

	ngOnInit() {
	}
}
