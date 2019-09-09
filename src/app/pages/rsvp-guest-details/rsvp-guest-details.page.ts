import { Component, OnInit } from '@angular/core';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController} from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-rsvp-guest-details',
  templateUrl: './rsvp-guest-details.page.html',
  styleUrls: ['./rsvp-guest-details.page.scss'],
})
export class RsvpGuestDetailsPage implements OnInit {

  rsvpGuest: RsvpGuest = {
    Name: '',
    DietaryRestrictions: ''
  };


  rsvpGuestID = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private rsvpGuestService: RsvpGuestService, 
    private loadingController: LoadingController,
    public menuController: MenuController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.rsvpGuestID = this.route.snapshot.params['id'];
    if (this.rsvpGuestID)  {
      this.loadRsvpGuest();
    }
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

  /*saveRsvp() {
    if (this.rsvpGuestID ) {
      this.rsvpGuestService.updateRsvpGuest(this.rsvpGuest, this.rsvpGuestID).then(docRef => {
      });
    } else {
      this.rsvpGuestService.addRsvpGuest(this.rsvpGuest).then(docRef => {
        this.rsvpGuestID = docRef.id;
      });
    }
  }*/

}
