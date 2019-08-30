import { Component  } from '@angular/core';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from 'ionic-angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-rsvp-guest-list',
  templateUrl: './rsvp-guest-list.page.html',
  styleUrls: ['./rsvp-guest-list.page.scss'],
})
export class RsvpGuestListPage {
  rsvpGuests: RsvpGuest[];
  rsvpId = null;

  constructor(
    private rsvpGuestService: RsvpGuestService,
    private route: ActivatedRoute,
    private router: Router,
    public menuController: MenuController,
    public events: Events) { }

  ionViewWillEnter() {
    this.menuController.enable(true);
    this.getEventData();
  }

  getEventData() {
    this.rsvpId = this.route.snapshot.params['id'];
    if (this.rsvpId)  {   
      this.events.publish('guest:created', this.rsvpId);  
      this.rsvpGuestService.getRsvpGuests()
      .then(data => {
        this.rsvpGuests = data;
      }) 
    }
  }

  viewDetails(item){
    this.router.navigateByUrl('/rsvp-guest-details/' + item.payload.doc.id);
  }
}
