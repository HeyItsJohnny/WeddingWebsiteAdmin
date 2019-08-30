import { Component, OnInit } from '@angular/core';
import { Dinner, DinnerService} from 'src/app/services/dinner.service';
import { ActivatedRoute} from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dinner-details',
  templateUrl: './dinner-details.page.html',
  styleUrls: ['./dinner-details.page.scss'],
})
export class DinnerDetailsPage implements OnInit {

  dinner: Dinner = {
    Name: '',
    Description: '',
    DisplayOrder: 0,
    UpdatedAt: 0,
    CreatedAt: 0
  };

  dinnerId = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private dinnerService: DinnerService, 
    public alertController: AlertController,
    public menuController: MenuController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.dinnerId = this.route.snapshot.params['id'];
    if (this.dinnerId)  {
      this.loadDinner();
    }
  }

  ionViewWillEnter() {
    //this.menuController.enable(true);
  }

  async loadDinner() {   
    const loading = await this.loadingController.create({
      message: 'Loading Dinner..'
    });
    await loading.present();
 
    this.dinnerService.getDinner(this.dinnerId).subscribe(res => {
      loading.dismiss();
      this.dinner = res;
    });
  }

  async saveDinner() {
    const loading = await this.loadingController.create({
      message: 'Saving Dinner..'
    });
    await loading.present();
 
    if (this.dinnerId) {
      this.dinnerService.updateDinner(this.dinner, this.dinnerId).then(() => {
        loading.dismiss();
        this.nav.back();
      });
    } 
  }

  async deleteDinner() {
    this.alertController.create({
      header: "Are you sure you want to delete this dinner?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.dinnerService.removeDinner(this.dinnerId).then(() => {
              this.nav.back();
            });
          }
        },
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }
      ]
    }).then(alert => alert.present());
  }

}
