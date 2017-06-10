import { Component, OnInit } from '@angular/core';

import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { UserService } from '../../providers/user/user.service';
import { AngularFireDatabase } from 'angularfire2/database';

import firebase from 'firebase';

@Component({
	selector: 'page-showdata',
	templateUrl: 'showdata.html'
})
export class ShowdataPage implements OnInit {

	public usersArray: any;
	public authStatus: boolean;
	private isAuth: BehaviorSubject<boolean>;

	private displayFallnummer: any;
	private displayKostengutsprache: any;

	ionViewDidLoad() {
		console.log('ionViewDidLoad ShowdataPage');

		this._user.auth.onAuthStateChanged(user => {
			this.isAuth.next(!!user);
			this._cd.detectChanges();
		});
	}

	constructor(db: AngularFireDatabase, private _user: UserService, private _cd: ChangeDetectorRef) {

		var myUserId = firebase.auth().currentUser.uid;
		this.displayUser(myUserId);

		this.isAuth = new BehaviorSubject(false);
		this.isAuth.subscribe(val => this.authStatus = val);

		var self = this;
		var ref = firebase.database().ref('newDef-SZB/' + myUserId + '/Broschüren');

		ref.once('value').then(function (childSnapshot) {
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

	displayUser(theUserId) {

		var that = this;
		this._user.viewUser(theUserId).then(snapshot => {
			snapshot.key,
				that.displayFallnummer = snapshot.val().Fallnummer,
				that.displayKostengutsprache = snapshot.val().Kostengutsprache
		});
	}

	ngOnInit() { }
}