import { Component, OnInit } from '@angular/core';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';
import { RsvpGuest, RsvpGuestService } from 'src/app/services/rsvp-guest.service';
import { AlertController } from '@ionic/angular';
import { Events } from 'ionic-angular';
import { Dinner, DinnerService } from 'src/app/services/dinner.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-start-new-rsvp',
  templateUrl: './start-new-rsvp.page.html',
  styleUrls: ['./start-new-rsvp.page.scss'],
})
export class StartNewRsvpPage implements OnInit {
  rsvps: Rsvp[];
  dinners: Dinner[];
  deleteRsvpGuests: RsvpGuest[];
  addRsvpGuests: RsvpGuest[];

  constructor(
    public alertController: AlertController,
    private rsvpService: RsvpService,
    private rsvpGuestService: RsvpGuestService,
    private dinnerService: DinnerService,
    public menuController: MenuController,
    public events: Events) { }

  findRsvp: Rsvp = {
    Name: '',
    SpecialTitle: '',
    SearchName: '',
    SearchSpecialTitle: '',
    Email: '',
    PhoneNo: '',
    Address1: '',
    Address2: '',
    AddressCity: '',
    AddressState: '',
    AddressPostCode: '',
    CoupleNotes: '',
    UpdatedAt: 0,
    isGoing: false,
    ThankYouLetterSent: false,
    NumberOfGuests: 0,
    CreatedAt: 0
  };

  getRsvp: Rsvp = {
    Name: '',
    SpecialTitle: '',
    SearchName: '',
    SearchSpecialTitle: '',
    Email: '',
    PhoneNo: '',
    Address1: '',
    Address2: '',
    AddressCity: '',
    AddressState: '',
    AddressPostCode: '',
    CoupleNotes: '',
    UpdatedAt: 0,
    isGoing: false,
    ThankYouLetterSent: false,
    NumberOfGuests: 0,
    CreatedAt: 0
  };

  rsvpGuest: RsvpGuest = {
    Name: '',
    DinnerNotes: '',
    DinnerChoice: '',
    DinnerChoiceText: ''
  };


  ngOnInit() {
    this.getDinnerData(); 
  }

  ionViewWillEnter() {
    this.menuController.enable(true);
  }

  getDinnerData() {
    var din = this.dinnerService.getDinnersToDisplay().subscribe (res => {
      this.dinners = res;
      din.unsubscribe();
    });
  }

  findRSVPRecord() {
    if (this.findRsvp.Name == "") {
      this.presentAlert("Error","Please enter in the Name on the RSVP.");
    } else {
      this.getRSVPrecord();
    }
  }

  getRSVPrecord() {
    var rservice = this.rsvpService.getRsvpFromSearch(this.findRsvp.Name).subscribe(res => {
      if (res.length == 0) {
        this.presentAlert("Error","RSVP was not found. Please try another name.");
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
            this.rsvpService.updateRsvpAttendance(DocSetID,true);
            this.rsvpService.updateRsvpCoupleNote(DocSetID,"");
            this.enterGuestInformation(DocSetID, NumOfGuests);
          }
        }, {
          text: 'No',
          handler: () => {
            this.rsvpService.updateRsvpAttendance(DocSetID,false);
            this.setNotAttendingNote(DocSetID);
          }
        }
      ]
    }).then(alert => alert.present())
  }

  setNotAttendingNote(DocSetID: string) {
    this.alertController.create({
      header: "Send the couple a note.",
      message: "Please leave the couple a small note.",
      inputs: [        
        {
          name: 'SmallNote',
          type: 'text',
          placeholder: 'Couple Note'
        }        
      ],
      buttons: [
        {
          text: 'OK',
          handler: (data) => {
            console.log(data.SmallNote);
            this.rsvpService.updateRsvpCoupleNote(DocSetID,data.SmallNote);
          }
        }
      ]
    }).then(alert => alert.present());
  }

  enterGuestInformation(DocSetID: string, NumOfGuests: number) {
    this.alertController.create({
      header: "Please enter Guest Information",
      inputs: [
        {
          name: 'guestEmail',
          type: 'text',
          placeholder: 'Email'
        },
        {
          name: 'guestPhoneNo',
          type: 'text',
          placeholder: 'Phone No.'
        }
      ],
      buttons: [
        {
          text: 'Ok',
          handler: (data: any) => {
            this.rsvpService.updateRsvpInformation(DocSetID,data.guestEmail,data.guestPhoneNo);
            this.enterAllGuests(DocSetID, NumOfGuests);
          }
        }
      ]
    }).then(alert => alert.present())
  }

  enterAllGuests(DocSetID: string, NumOfGuests: number) {
    var options = {
      header: "List all attendees",
      subHeader: "Max Number of attendees: " + NumOfGuests,
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
                });
              }
            } 
            this.askDietaryRestrictions();  
            this.startDinnerSelection(); 
          }
        }
      ]
    };

    for (var i = 1; i <= NumOfGuests; i++) {
      options.inputs.push({ name: "guest" + i,  type: 'text', placeholder: "Guest Name"});
    }
    this.alertController.create(options).then(alert => alert.present());
  }

  startDinnerSelection() {
    this.events.publish('guest:created', this.getRsvp.id);
    var rsvpGuestUbsubscribe = this.rsvpGuestService.getRsvpGuestsForSearch().subscribe(data => {
      this.addRsvpGuests  = data;
      rsvpGuestUbsubscribe.unsubscribe();
      for(var item of this.addRsvpGuests) {
        this.setDinnerSelection(item.id, item.Name);
      }
    })
  }

  
  async setDinnerSelection(rsvpGuestID: string, rsvpGuestName: string) {
    var options = {
      header: rsvpGuestName + " Dinner Selection",
      subHeader: "Please select a dinner",
      inputs: [],
      buttons: [
        {
          text: 'Ok',
          handler: (data: any) => {
            console.log('Data: ' + data);
            this.events.publish('guest:created', this.getRsvp.id);
            this.rsvpGuestService.updateRsvpGuestDinnerChoiceText(this.getDinnerString(data),rsvpGuestID);
            this.rsvpGuestService.updateRsvpGuestDinnerChoice(data,rsvpGuestID).then(function() {
              console.log("Dinner Choice successfully updated!");
            });
          }
        }
      ]
    };

    for (let item of this.dinners) {
      options.inputs.push({ name : item.Name, value: item.id , label: item.Name, type: 'radio'});
    }
    
    let alert = await this.alertController.create(options);
    await alert.present();
  }

  getDinnerString(dinnerID: string) {
    for (let item of this.dinners) {
      if (item.id == dinnerID) {
        return item.Name;
      }
    }
    return "";
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
