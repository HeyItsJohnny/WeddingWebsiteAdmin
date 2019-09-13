import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';

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

  TotalCost: string;
  TotalOverUnderBudget: string;

  constructor(
    private weddingDayDetailsService: WeddingDayDetailsService,
    public menuController: MenuController) { }


  ionViewWillEnter() {
    this.menuController.enable(true);
    this.loadWeddingDay(); 
  }

  loadWeddingDay() {
    var wedDay = this.weddingDayDetailsService.getWeddingDay().subscribe(res => {
      this.weddingDay = res;
      this.getBudgetData(this.weddingDay.EstimatedNoOfGuests);
      wedDay.unsubscribe();
    });
  }

  getBudgetData(OverallAttendance: number) {
    var guestData = new google.visualization.DataTable();
    guestData.addColumn('string', 'Attendance');
    guestData.addColumn('number', 'Number of Attendance');  
    guestData.addRow(["Invited",OverallAttendance]);

    var options = {
      title: 'Wedding Attendance'
    };

    

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(guestData, options);
  }
}
