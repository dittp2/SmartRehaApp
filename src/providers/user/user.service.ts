import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class UserService {

    public auth: any;
    public userProfile: any;
    public userProfile2: any;

    constructor() {
        this.auth = firebase.auth();
        this.userProfile = firebase.database().ref('newDef-SZB');
        this.userProfile2 = firebase.database().ref('newDef-SZB/userId/Broschüren');
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
}








// import { Injectable } from '@angular/core';

// import firebase from 'firebase';

// @Injectable()
// export class UserService {
//     public auth: any;
//     constructor() {
//         this.auth = firebase.auth();
//     }

//     public login(userEmail: string, userPassword: string) {
//         return new Promise((resolve, reject) => {
//             this.auth.signInWithEmailAndPassword(userEmail, userPassword)
//                 .then(userData => resolve(userData),
//                 err => reject(err));
//         });
//     }

//     public logout() {
//         return this.auth.signOut();
//     }
// }
