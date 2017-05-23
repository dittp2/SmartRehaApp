import {Injectable} from '@angular/core';

import firebase from 'firebase';

import { Storage } from '@ionic/storage';

@Injectable()
export class DataService {
    public db: any;
    public staticData: any;

    constructor(public storage: Storage) {}

    init() {
		const config = {
      apiKey: "AIzaSyADX4f85rk1HKdurmGkV85rTLnm15SKpng",
      authDomain: "lc1-firetest.firebaseapp.com",
      databaseURL: "https://lc1-firetest.firebaseio.com",
      storageBucket: "lc1-firetest.appspot.com",
      messagingSenderId: "548598469948"
		};

		firebase.initializeApp(config);

		this.db = firebase.database().ref('/');
		this.staticData = firebase.database().ref('/static');
    }

	getData() {
		return this.storage.get('todos');
  }

  save(data){
    let newData = JSON.stringify(data);
    this.storage.set('todos', newData);
  }
}
