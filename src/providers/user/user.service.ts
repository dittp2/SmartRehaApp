import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import firebase from 'firebase';

@Injectable()
export class UserService {

    public auth: any;
    public userProfile: any;

    constructor(private database: AngularFireDatabase) {

        this.auth = firebase.auth();
        this.userProfile = firebase.database().ref('newDef-SZB');
    }

    public login(userEmail: string, userPassword: string) {
        return new Promise((resolve, reject) => {
            // this.auth.signInWithEmailAndPassword(userEmail, 'SpitalZB')
            this.auth.signInWithEmailAndPassword(userEmail, 'newDef2')
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
}