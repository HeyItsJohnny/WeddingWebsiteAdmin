import { Component } from '@angular/core';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';


@Component({
  selector: 'app-wedding-guests',
  templateUrl: './wedding-guests.page.html',
  styleUrls: ['./wedding-guests.page.scss'],
})
export class WeddingGuestsPage {
  public rsvps: Array<any>;
  public rsvpGuests: Array<any>;
  public guests: Array<any>;

  constructor(
    private rsvpGuestService: RsvpGuestService,
    private rsvpService: RsvpService) { }

 
    ionViewWillEnter() {
      this.getRsvpData();
      this.getRsvpGuests();
    }

    getRsvpData() {
      this.rsvpService.getRsvps().then(data => {
        this.rsvps = data;
      });
    }

    getRsvpGuests() {
      for(let item of this.rsvps) {
        console.log('ID: ' + item.payload.doc.id + ' Name: ' + item.payload.doc.data().Name); 
      }
    }

}
