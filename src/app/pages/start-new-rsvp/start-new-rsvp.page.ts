import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { AlertController } from '@ionic/angular';
import { Events } from 'ionic-angular';
import { MenuController } from '@ionic/angular';
import { RsvpAttendingNoDetails, RsvpAttendingNoService} from 'src/app/services/rsvp-attending-no.service';
import { RsvpAttendingDetails, RsvpAttendingService} from 'src/app/services/rsvp-attending.service';

@Component({
  selector: 'app-start-new-rsvp',
  templateUrl: './start-new-rsvp.page.html',
  styleUrls: ['./start-new-rsvp.page.scss'],
})
export class StartNewRsvpPage implements OnInit {
  rsvps: Rsvp[];
  deleteRsvpGuests: RsvpGuest[];
  addRsvpGuests: RsvpGuest[];

  constructor(
    public alertController: AlertController,
    private rsvpService: RsvpService,
    private rsvpGuestService: RsvpGuestService,
    private rsvpAttend: RsvpAttendingService,
    private rsvpNoAttend: RsvpAttendingNoService,
    public menuController: MenuController,
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

  rsvpAttending: RsvpAttendingDetails = {
    rsvpID: '',
    rsvpGuestID: ''
  };

  rsvpAttendingNo: RsvpAttendingNoDetails = {
    rsvpID: '',
    rsvpGuestID: ''
  };


  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
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
          this.showAttendingAlert(rsvp.id,rsvp.NumberOfGuests, rsvp.Name);
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
            this.rsvpService.updateRsvpAttendance(DocSetID,"Going");
            this.enterAllGuests(NumOfGuests);            
          }
        }, {
          text: 'No',
          handler: () => {
            this.rsvpService.updateRsvpAttendance(DocSetID,"Not Going");
            for (var i = 1; i <= NumOfGuests; i++) {
              this.rsvpAttendingNo.id = RSVPName + '-' + i;
              this.rsvpAttendingNo.rsvpID = DocSetID;
              this.rsvpAttendingNo.rsvpGuestID = '';
              this.rsvpNoAttend.addRsvpAttending(this.rsvpAttendingNo,RSVPName + '-' + NumOfGuests);
            }
          }
        }
      ]
    }).then(alert => alert.present())
  }

  enterAllGuests(NumOfGuests: number) {
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
                this.rsvpGuestService.addRsvpGuest(this.rsvpGuest).then(docRef => {
                  this.rsvpGuest.id = docRef.id;
                  this.rsvpAttending.id = data[k] + '-' + k;
                  this.rsvpAttending.rsvpID = this.getRsvp.id;
                  this.rsvpAttending.rsvpGuestID = '';
                  this.rsvpAttend.addRsvpAttending(this.rsvpAttending,data[k] + '-' + k);
                });
              }
            } 
            this.askDietaryRestrictions();  
          }
        }
      ]
    };

    for (var i = 1; i <= NumOfGuests; i++) {
      options.inputs.push({ name: "guest" + i,  type: 'text', placeholder: "Guest Name"});
    }
    this.alertController.create(options).then(alert => alert.present());
  }

 askDietaryRestrictions() {
    this.alertController.create({
      header: "Allergies/Dietary Restrictions",
      message: "Does your group have food allergies or require any dietary restrictions?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.setDietaryRestrictions();
          }
        }, {
          text: 'No',
          handler: () => {
            console.log("No Dietary restrictions.");
          }
        }
      ]
    }).then(alert => alert.present());
  }

  setDietaryRestrictions() {
    var options = {
      header: "Allergies/Dietary Restrictions",
      message: "Please note all dietary restrictions & Food Allergies within your group.",
      inputs: [],
      buttons: [
        {
          text: 'Ok',
          handler: (data: any) => {
            for (var k in data) {
              if (data[k] != "") {
                this.events.publish('guest:created', this.getRsvp.id);
                this.rsvpGuestService.updateRsvpGuestDietaryRestrictions(data[k],k);
              }
            } 
          }
        }
      ]
    };
    for(var item of this.addRsvpGuests) {
      options.inputs.push({ name: item.id,  type: 'text', placeholder: item.Name + " Diet Notes"});
    }
    this.alertController.create(options).then(alert => alert.present());
  }

  async presentAlert(headerStr: string, messageStr: string) {
    const alert = await this.alertController.create({
      header: headerStr,
      message: messageStr,
      buttons: ['OK']
    });
    await alert.present();
  }

}
