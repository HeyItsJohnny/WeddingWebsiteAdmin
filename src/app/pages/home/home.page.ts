import { Component } from '@angular/core';
import { BudgetManagerService } from 'src/app/services/budget-manager.service';
import { MenuController } from '@ionic/angular';
import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public menuController: MenuController) { }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }
  
}
