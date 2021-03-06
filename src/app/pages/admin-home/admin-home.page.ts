import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';
import { Rsvp, RsvpService } from 'src/app/services/rsvp.service';

declare var google;

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage {

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
  weddingDayId = null;

  TotalInvited: string;
  TotalAttending: string;
  TotalNotAttending: string;
  TotalNotResponded: string;

  constructor(
    private weddingDayDetailsService: WeddingDayDetailsService,
    private rsvpService: RsvpService,
    public menuController: MenuController) { }


  ionViewWillEnter() {
    this.menuController.enable(true);
    this.loadWeddingDay(); 
  }

  loadWeddingDay() {
    var wedDay = this.weddingDayDetailsService.getWeddingDay().subscribe(res => {
      this.weddingDay = res;
      this.getBudgetData(this.weddingDay.NoOfAttending,this.weddingDay.NoOfNotAttending);
      wedDay.unsubscribe();
    });
  }

  getBudgetData(Attending: number, NotAttending: number) {
    var guestData = new google.visualization.DataTable();
    guestData.addColumn('string', 'Attendance');
    guestData.addColumn('number', 'Number of Attendance');  

    this.rsvpService.getAllInvited().then(result => {
      var NotResponded = 0;
      this.TotalInvited = "Total Invited: " + result.TotalInvited;
      NotResponded = result.TotalInvited - Attending - NotAttending;
      this.TotalNotResponded = "Total Not Responded: " + NotResponded;
      //guestData.addRow(["Invited",result.TotalInvited]);
      guestData.addRow(["Not Responded",NotResponded]);
      chart.draw(guestData, options);
    });

    guestData.addRow(["Attending", Attending]);
    guestData.addRow(["Not Attending",NotAttending]);

    this.TotalAttending = "Total Attending: " + Attending;
    this.TotalNotAttending = "Total Not Attending: " + NotAttending;

    var options = {
      title: 'Wedding Attendance'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(guestData, options);
  }
}
