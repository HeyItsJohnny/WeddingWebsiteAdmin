import { Component, OnInit } from '@angular/core';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController} from '@ionic/angular';
import { Dinner, DinnerService } from 'src/app/services/dinner.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-rsvp-guest-details',
  templateUrl: './rsvp-guest-details.page.html',
  styleUrls: ['./rsvp-guest-details.page.scss'],
})
export class RsvpGuestDetailsPage implements OnInit {

  dinners: Dinner[];

  rsvpGuest: RsvpGuest = {
    Name: '',
    DinnerNotes: '',
    DinnerChoice: '',
    DinnerChoiceText: ''
  };


  rsvpGuestID = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private rsvpGuestService: RsvpGuestService, 
    private loadingController: LoadingController,
    public menuController: MenuController,
    private alertController: AlertController,
    private dinnerService: DinnerService) { }

  ngOnInit() {
    this.rsvpGuestID = this.route.snapshot.params['id'];
    if (this.rsvpGuestID)  {
      this.loadRsvpGuest();
    }
    this.getDinnerData();
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  async loadRsvpGuest() {   
    const loading = await this.loadingController.create({
      message: 'Loading RSVP Guest..'
    });
    await loading.present();
 
    this.rsvpGuestService.getRsvpGuest(this.rsvpGuestID).subscribe(res => {
      loading.dismiss();
      this.rsvpGuest = res;
    });
  }

  getDinnerData() {
    var din = this.dinnerService.getDinnersToDisplay().subscribe (res => {
      this.dinners = res;
      din.unsubscribe();
    });
  }

  goBack(){
    this.nav.back;
  }

  async saveRsvpGuest() {
    const loading = await this.loadingController.create({
      message: 'Saving RSVP Guest..'
    });
    await loading.present();
 
    if (this.rsvpGuestID) {
      this.rsvpGuestService.updateRsvpGuest(this.rsvpGuest, this.rsvpGuestID).then(() => {
        loading.dismiss();
        this.nav.back;
      });
    } else {
      this.rsvpGuestService.addRsvpGuest(this.rsvpGuest).then(() => {
        loading.dismiss();
        this.nav.back;
      });
    }
  }

  async deleteGuest() {
    this.alertController.create({
      header: "Are you sure you want to delete this guest?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.rsvpGuestService.removeRsvpGuest(this.rsvpGuestID).then(() => {
              this.nav.back;
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

  async goToDinnerSelection() {
    this.saveRsvp();
    var options = {
      header: "Dinner Selection",
      subHeader: "Please select a dinner",
      inputs: [],
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
          handler: (data: any) => {
            this.rsvpGuestService.updateRsvpGuestDinnerChoiceText(this.getDinnerString(data),this.rsvpGuestID);
            this.rsvpGuestService.updateRsvpGuestDinnerChoice(data,this.rsvpGuestID).then(function() {
              this.nav.goBack(true);
            });     
          }
        }
      ]
    };

    for (let item of this.dinners) {
      options.inputs.push({ name : item.Name, value: item.id , label: item.Name, type: 'radio', checked: this.setTheInputCheck(item.id)});
    }
    
    let alert = await this.alertController.create(options);
    await alert.present();
  }

  setTheInputCheck(dinnerID: string){
    if (dinnerID == this.rsvpGuest.DinnerChoice) {
      return true;
    } else {
      return false;
    }
  }

  getDinnerString(dinnerID: string) {
    for (let item of this.dinners) {
      if (item.id == dinnerID) {
        return item.Name;
      }
    }
    return "";
  }

  saveRsvp() {
    if (this.rsvpGuestID ) {
      this.rsvpGuestService.updateRsvpGuest(this.rsvpGuest, this.rsvpGuestID).then(docRef => {
      });
    } else {
      this.rsvpGuestService.addRsvpGuest(this.rsvpGuest).then(docRef => {
        this.rsvpGuestID = docRef.id;
      });
    }
  }

}
