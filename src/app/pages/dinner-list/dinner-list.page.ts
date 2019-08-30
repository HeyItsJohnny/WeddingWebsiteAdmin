import { Component } from '@angular/core';
import { Dinner, DinnerService } from 'src/app/services/dinner.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dinner-list',
  templateUrl: './dinner-list.page.html',
  styleUrls: ['./dinner-list.page.scss'],
})
export class DinnerListPage {

  dinners: Dinner[];

  constructor(
    private dinnerService: DinnerService,
    private router: Router,
    public menuController: MenuController,
    public alertController: AlertController) { }

    ionViewWillEnter() {
      this.menuController.enable(true);
      this.getDinnerData();
     }
  
    getDinnerData() {
      this.dinnerService.getDinners()
      .then(events => {
        this.dinners = events;
      })
    }
  
    addItem() {
      this.displayAddPrompt();
    }
  
    viewDetails(item){
      this.router.navigateByUrl('/dinner-details/' + item.payload.doc.id);
    }
  
    displayAddPrompt() {
      this.alertController.create({
        header: 'New Dinner',
        inputs: [
          {
            name: 'DinnerName',
            type: 'text',
            placeholder: 'Dinner'
          },
          {
            name: 'DinnerDescription',
            type: 'text',
            placeholder: 'Description'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              var dinnerObj: Dinner = {
                Name: data.DinnerName,
                Description: data.DinnerDescription,
                DisplayOrder: 0,
                UpdatedAt: 0,
                CreatedAt: 0
              };       
              this.dinnerService.addDinner(dinnerObj);   
              this.getDinnerData();      
            }
          }
        ]
      }).then(alert => alert.present());
    }

}
