import { Injectable } from '@angular/core';

import firebase from 'firebase';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class UserService {

    public auth: any;
    public userProfile: any;
    public userProfile2: any;
    docs: FirebaseListObservable<any[]>;


    constructor(private database: AngularFireDatabase) {
        this.docs = database.list('newDef-SZB/Broschüren');
        this.auth = firebase.auth();
        this.userProfile = firebase.database().ref('newDef-SZB');
        this.userProfile2 = firebase.database().ref('newDef-SZB/Broschüren');
    }

    public login(userEmail: string, userPassword: string) {
        return new Promise((resolve, reject) => {
            this.auth.signInWithEmailAndPassword(userEmail, userPassword)
                .then(userData => resolve(userData),
                err => reject(err));
        });
    }

    public logout() {
        return this.auth.signOut();
    }

    viewUser(userId: any) {
        var userRef = this.userProfile.child(userId);
        return userRef.once('value');
    }

    viewUser2(userId: any) {
        var userRef2 = this.userProfile2.child(userId);
        return userRef2.once('value');
    }
}