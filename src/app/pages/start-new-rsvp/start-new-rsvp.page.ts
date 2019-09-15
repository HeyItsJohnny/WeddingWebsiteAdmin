import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { AlertController } from '@ionic/angular';
import { Events } from 'ionic-angular';
import { MenuController } from '@ionic/angular';
import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-start-new-rsvp',
  templateUrl: './start-new-rsvp.page.html',
  styleUrls: ['./start-new-rsvp.page.scss'],
})
export class StartNewRsvpPage implements OnInit {
  rsvps: Rsvp[];
  deleteRsvpGuests: RsvpGuest[];
  addRsvpGuests: RsvpGuest[];

  totalAttending: number;
  totalNotAttending: number;

  constructor(
    public alertController: AlertController,
    private rsvpService: RsvpService,
    private rsvpGuestService: RsvpGuestService,
    public menuController: MenuController,
    private weddingDayDetailsService: WeddingDayDetailsService, 
    private router: Router,
    public events: Events) { }

  findRsvp: Rsvp = {
    Name: '',
    Email: '',
    RSVPCode: '',
    SearchName: '',
    SearchEmail: '',
    SearchRSVPCode: '',
    PhoneNo: '',
    Address1: '',
    Address2: '',
    AddressCity: '',
    AddressState: '',
    AddressPostCode: '',
    NumberOfGuests: 0,
    AttendingOption: ''
  };

  getRsvp: Rsvp = {
    Name: '',
    Email: '',
    RSVPCode: '',
    SearchName: '',
    SearchEmail: '',
    SearchRSVPCode: '',
    PhoneNo: '',
    Address1: '',
    Address2: '',
    AddressCity: '',
    AddressState: '',
    AddressPostCode: '',
    NumberOfGuests: 0,
    AttendingOption: ''
  };

  rsvpGuest: RsvpGuest = {
    Name: '',
    DietaryRestrictions: ''
  };

  weddingDay: WeddingDayDetails = {
    WeddingPartyGroupdID: '',
    WeddingDate: null,
    EstimatedNoOfGuests: 0,
    NoOfAttending: 0,
    NoOfNotAttending: 0,
    YourName: '',
    BudgetEstimate: 0,
    FianceName: '',
    ReceptionTime: null,
    DinnerTime: null,
    CocktailTime: null,
    VenueName: '',
    VenueAddress1: '',
    VenueAddress2: '',
    VenueCity: '',
    VenueState: '',
    VenueZip: ''
  };

  ngOnInit() {
    this.loadWeddingDay();
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  async loadWeddingDay() {   
    var wedService = this.weddingDayDetailsService.getWeddingDay().subscribe(res => {
      this.weddingDay = res;
      this.totalAttending = this.weddingDay.NoOfAttending;
      this.totalNotAttending = this.weddingDay.NoOfNotAttending;
      wedService.unsubscribe();
    });
  }

  findRSVPRecord() {
    if (this.findRsvp.RSVPCode == "") {
      this.presentAlert("Error","Please enter in the Name on the RSVP.");
    } else {
      this.getRSVPrecord();
    }
  }

  getRSVPrecord() {
    var rservice = this.rsvpService.getRsvpCodeFromSearch(this.findRsvp.RSVPCode).subscribe(res => {
      if (res.length == 0) {
        this.presentAlert("Error","RSVP was not found. Please try another email.");
      } else {
        this.rsvps = res.map(a => {
          const rsvp: Rsvp = a.payload.doc.data() as Rsvp;
          rsvp.id = a.payload.doc.id;
          this.getRsvp.id = rsvp.id;
          this.getRsvp.Name = rsvp.Name;
          this.getRsvp.Email = rsvp.Email;
          this.getRsvp.NumberOfGuests = rsvp.NumberOfGuests;   
          if (rsvp.AttendingOption == '') {
            this.showAttendingAlert(rsvp.id,rsvp.NumberOfGuests, rsvp.Name);
          } else {
            this.presentAlert("You have already RSVPed as " + rsvp.AttendingOption,"Please contact Nancy or Jonathan if this has changed.");
          }
          rservice.unsubscribe();
          return rsvp;          
        });
      }      
    });
  }

  showAttendingAlert(DocSetID: string, NumOfGuests: number, RSVPName: string)
  {    
    this.alertController.create({
      header: "Hello " + RSVPName + "!",
      message: "Will you be attending?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.rsvpService.updateRsvpAttendance(DocSetID,"Attending");
            this.enterAllGuests(NumOfGuests,DocSetID);            
          }
        }, {
          text: 'No',
          handler: () => {
            this.rsvpService.updateRsvpAttendance(DocSetID,"Not Attending");
            this.setGuestsNotAttending(NumOfGuests);
            this.presentAlert("Sorry you cannot make it!","If anything changes please contact us at nancy.tran.15@gmail.com or jonathan.laroco@gmail.com");
          }
        }
      ]
    }).then(alert => alert.present())
  }

  enterAllGuests(NumOfGuests: number, DocSetID: string) {
    var options = {
      header: "List all attendees",
      message: "Please include yourself below",
      inputs: [],
      buttons: [
        {
          text: 'Ok',
          handler: (data: any) => {
            for (var k in data) {
              if (data[k] != "") {
                this.events.publish('guest:created', this.getRsvp.id);
                this.rsvpGuest.Name = data[k];
                this.setGuestsAttending();
                this.rsvpGuestService.addRsvpGuest(this.rsvpGuest).then(docRef => {
                  //this.rsvpGuest.id = docRef.id;
                });
              }
            } 
            this.askDietaryRestrictions(DocSetID);
          }
        }
      ]
    };

    for (var i = 1; i <= NumOfGuests; i++) {
      options.inputs.push({ name: "guest" + i,  type: 'text', placeholder: "Guest Name"});
    }
    this.alertController.create(options).then(alert => alert.present());
  }

 askDietaryRestrictions(DocSetID: string) {
    this.alertController.create({
      header: "Allergies/Dietary Restrictions",
      message: "Does your group have food allergies or require any dietary restrictions?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.router.navigateByUrl('/rsvp-diet-restrictions/' + DocSetID);
          }
        }, {
          text: 'No',
          handler: () => {
            this.presentAlert("Thank you!","If you have any questions please contact us at nancy.tran.15@gmail.com or jonathan.laroco@gmail.com");
          }
        }
      ]
    }).then(alert => alert.present());
  }

  async presentAlert(headerStr: string, messageStr: string) {
    const alert = await this.alertController.create({
      header: headerStr,
      message: messageStr,
      buttons: ['OK']
    });
    await alert.present();
  }

  setGuestsNotAttending(NumOfGuests: number) {
    this.totalNotAttending = this.totalNotAttending + NumOfGuests;
    this.weddingDayDetailsService.updateNotAttending(this.totalNotAttending);
  }

  setGuestsAttending() {
    this.totalAttending = this.totalAttending + 1;
    this.weddingDayDetailsService.updateAttending(this.totalAttending);
  }
}
