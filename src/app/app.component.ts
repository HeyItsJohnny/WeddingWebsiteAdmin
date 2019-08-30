import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/admin-home',
      icon: 'home'
    },
    {
      title: 'Basic Information',
      url: '/wedding-day-details',
      icon: 'list'
    },
    {
      title: 'Guests',
      url: '/rsvp-list',
      icon: 'list'
    },
    {
      title: 'Dinners',
      url: '/dinner-list',
      icon: 'list'
    },
    {
      title: 'New RSVP',
      url: '/start-new-rsvp',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
