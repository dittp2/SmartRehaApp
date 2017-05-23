import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { ShowdataPage } from '../pages/showdata/showdata';
import { AuthPage } from '../pages/auth/auth';
import { TodoPage } from '../pages/todo/todo';
import { FileuploadPage } from '../pages/fileupload/fileupload';
import { RehaFilesPage } from '../pages/reha-files/reha-files';

import { AuthService } from "./auth.service";
import { DataService } from '../providers/data/data.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private authService: AuthService, data: DataService) {
    this.initializeApp();
	data.init();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Startseite', component: HomePage },
	  { title: 'Anmeldung', component: SigninPage },
	  // { title: 'Sign-up', component: SignupPage },
	  { title: 'Daten & Informationen', component: ShowdataPage },
	  // { title: 'Auth Page', component: AuthPage },
	  // { title: 'Todo Page', component: TodoPage },
	  // { title: 'FileUpload Page', component: FileuploadPage },
    { title: 'Broschüren', component: RehaFilesPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }
}
