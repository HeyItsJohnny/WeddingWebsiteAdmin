import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-rsvp-details',
  templateUrl: './rsvp-details.page.html',
  styleUrls: ['./rsvp-details.page.scss'],
})
export class RsvpDetailsPage implements OnInit {

  rsvp: Rsvp = {
    Name: '',
    Email: '',
    SearchName: '',
    SearchEmail: '',
    PhoneNo: '',
    Address1: '',
    Address2: '',
    AddressCity: '',
    AddressState: '',
    AddressPostCode: '',
    NumberOfGuests: 0,
    AttendingOption: ''
  };

  rsvpId = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private rsvpService: RsvpService, 
    private loadingController: LoadingController,
    public alertController: AlertController,
    public menuController: MenuController,
    private router: Router) { }

  ngOnInit() {
    this.rsvpId = this.route.snapshot.params['id'];
    if (this.rsvpId)  {
      this.loadRsvp();
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  async loadRsvp() {   
    const loading = await this.loadingController.create({
      message: 'Loading RSVPs..'
    });
    await loading.present();
 
    this.rsvpService.getRsvp(this.rsvpId).subscribe(res => {
      loading.dismiss();
      this.rsvp = res;
    });
  }

  async saveRsvp() {
 
    const loading = await this.loadingController.create({
      message: 'Saving RSVPs..'
    });
    await loading.present();
 
    if (this.rsvpId) {
      this.rsvpService.updateRsvp(this.rsvp, this.rsvpId).then(() => {
        loading.dismiss();
        this.nav.back;
      });
    } else {
      this.rsvpService.addRsvp(this.rsvp).then(() => {
        loading.dismiss();
        this.nav.back;
      });
    }
  }

  async goToGroupMembers() {
    if (this.rsvpId) {
      this.rsvpService.updateRsvp(this.rsvp, this.rsvpId).then(docRef => {
        this.router.navigateByUrl('/rsvp-guest-list/' + this.rsvpId);
      });
    } else {
      this.rsvpService.addRsvp(this.rsvp).then(docRef => {
        this.rsvpId = docRef.id;
        this.router.navigateByUrl('/rsvp-guest-list/' + this.rsvpId);
      });
    }
  }

  async deleteRsvp() {
    this.alertController.create({
      header: "Are you sure you want to delete this guest?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.rsvpService.removeRsvp(this.rsvpId).then(() => {
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

}
