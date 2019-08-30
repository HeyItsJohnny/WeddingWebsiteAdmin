import { Component } from '@angular/core';
import { BudgetManagerService } from 'src/app/services/budget-manager.service';
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
    WeddingInvitesSentOut: false,
    UpdatedAt: 0
  };
  weddingDayId = null;

  TotalCost: string;
  TotalOverUnderBudget: string;

  constructor(
    private budgetService: BudgetManagerService,
    private weddingDayDetailsService: WeddingDayDetailsService,
    public menuController: MenuController) { }


  ionViewWillEnter() {
    this.menuController.enable(true);
    this.loadWeddingDay(); 
  }

  loadWeddingDay() {
    var wedDay = this.weddingDayDetailsService.getWeddingDay().subscribe(res => {
      this.weddingDay = res;
      this.getBudgetData(this.weddingDay.BudgetEstimate);
      wedDay.unsubscribe();
    });
  }

  getBudgetData(OverallBudget: number) {
    //this.reloadActualCostChart(OverallBudget);
  }

  /*reloadActualCostChart(OverallBudget: number) {
    // Create the data table.
    var estdata = new google.visualization.DataTable();
    estdata.addColumn('string', 'Category');
    estdata.addColumn('number', '$$ against budget');   

   //All Chart Data
   this.budgetService.getAllChartData("Actual").then(result => {
     let remainBudget = +OverallBudget - +result.TotalCost;
     if (remainBudget > 0) {
       estdata.addRow(["Remaining Budget",remainBudget]);
       this.TotalOverUnderBudget = "Under Budget by: " + remainBudget;
     } else {
       this.TotalOverUnderBudget = "Over Budget by: " + remainBudget;
     }
     this.TotalCost = "Total Cost: " + result.TotalCost;
     chart.draw(estdata, options);
   });

    //Reception
    this.budgetService.getChartData("Reception","Actual").then(result => {
      estdata.addRow(["Reception",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Ceremony
    this.budgetService.getChartData("Ceremony","Actual").then(result => {
      estdata.addRow(["Ceremony",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Apparel/Bride
    this.budgetService.getChartData("Apparel/Bride","Actual").then(result => {
      estdata.addRow(["Apparel/Bride",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Apparel/Groom
    this.budgetService.getChartData("Apparel/Groom","Actual").then(result => {
      estdata.addRow(["Apparel/Groom",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Wedding Rings
    this.budgetService.getChartData("Wedding Rings","Actual").then(result => {
      estdata.addRow(["Wedding Rings",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Photographer
    this.budgetService.getChartData("Photographer","Actual").then(result => {
      estdata.addRow(["Photographer",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Videographer
    this.budgetService.getChartData("Videographer","Actual").then(result => {
      estdata.addRow(["Videographer",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Flowers
    this.budgetService.getChartData("Flowers","Actual").then(result => {
      estdata.addRow(["Flowers",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Entertainment
    this.budgetService.getChartData("Entertainment","Actual").then(result => {
      estdata.addRow(["Entertainment",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Stationary
    this.budgetService.getChartData("Stationary","Actual").then(result => {
      estdata.addRow(["Stationary",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Accessories
    this.budgetService.getChartData("Accessories","Actual").then(result => {
      estdata.addRow(["Accessories",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Gifts
    this.budgetService.getChartData("Gifts","Actual").then(result => {
      estdata.addRow(["Gifts",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Transportation
    this.budgetService.getChartData("Transportation","Actual").then(result => {
      estdata.addRow(["Transportation",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Beauty
    this.budgetService.getChartData("Beauty","Actual").then(result => {
      estdata.addRow(["Beauty",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Optional
    this.budgetService.getChartData("Optional","Actual").then(result => {
      estdata.addRow(["Optional",result.TotalCost]);
      chart.draw(estdata, options);
    });

    //Overages
    this.budgetService.getChartData("Overages","Actual").then(result => {
      estdata.addRow(["Overages",result.TotalCost]);
      chart.draw(estdata, options);
    });

    // Set chart options
    var options = {
      'title':'Budget Actual Chart',
       'width':600,
       'height':400,
       slices: {
         0: { color: 'grey' },
       }
     };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('total_guests_div'));
   }*/
}
