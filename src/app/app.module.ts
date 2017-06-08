import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { ShowdataPage } from '../pages/showdata/showdata';
import { RehaFilesPage } from '../pages/reha-files/reha-files';

import { AngularFireModule } from 'angularfire2';
import { ChecklistePagePage } from '../pages/checkliste/checkliste';


import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AuthService } from "./auth.service";

import { DataTableModule } from "angular2-datatable";

import {
	ReactiveFormsModule
} from '@angular/forms';

import { AuthGuard } from "./auth.guard";

import { DataService } from '../providers/data/data.service';
import { UserService } from '../providers/user/user.service';

import { Storage } from '@ionic/storage';

export const firebaseConfig = {
	apiKey: "AIzaSyADX4f85rk1HKdurmGkV85rTLnm15SKpng",
	authDomain: "lc1-firetest.firebaseapp.com",
	databaseURL: "https://lc1-firetest.firebaseio.com",
	projectId: "lc1-firetest",
	storageBucket: "lc1-firetest.appspot.com",
	messagingSenderId: "548598469948"
};

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		SigninPage,
		ShowdataPage,
		ChecklistePagePage,
		RehaFilesPage
	],
	imports: [
		IonicModule.forRoot(MyApp, {
			tabsPlacement: 'bottom',
			platforms: {
				android: {
					tabsPlacement: 'top'
				},
				ios: {
					tabsPlacement: 'top'
				},
				windows:
				{
					tabsPlacement: 'top'
				}
			}
		}),
		AngularFireModule.initializeApp(firebaseConfig),
		DataTableModule,
		ReactiveFormsModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		SigninPage,
		ShowdataPage,
		ChecklistePagePage,
		RehaFilesPage
	],
	providers: [Storage, DataService, UserService, AuthService, AuthGuard, { provide: ErrorHandler, useClass: IonicErrorHandler }, InAppBrowser]
})
export class AppModule { }
