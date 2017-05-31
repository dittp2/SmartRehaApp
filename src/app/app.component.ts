import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
// import { SignupPage } from '../pages/signup/signup';
import { ShowdataPage } from '../pages/showdata/showdata';
// import { AuthPage } from '../pages/auth/auth';
// import { TodoPage } from '../pages/todo/todo';
// import { FileuploadPage } from '../pages/fileupload/fileupload';
import { RehaFilesPage } from '../pages/reha-files/reha-files';

import { AuthService } from "./auth.service";
import { DataService } from '../providers/data/data.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, private authService: AuthService, data: DataService) {
    this.initializeApp();
    data.init();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Startseite', component: HomePage },
      { title: 'Anmeldung', component: SigninPage },
      { title: 'Daten & Informationen', component: ShowdataPage },
      { title: 'Broschüren', component: RehaFilesPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }
}
