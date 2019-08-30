import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { BudgetManager, BudgetManagerService } from 'src/app/services/budget-manager.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-budget-manager-details',
  templateUrl: './budget-manager-details.page.html',
  styleUrls: ['./budget-manager-details.page.scss'],
})
export class BudgetManagerDetailsPage implements OnInit {

  budget: BudgetManager = {
    Category: '',
    SubCategory: '',
    BudgetName: '',
    BudgetDescription: '',
    SearchName: '',
    SearchCategoryName: '',
    SearchSubCategoryName: '',
    SuggestedPercent: 0,
    ActualCost: 0,
    SuggestedAmount: 0,
    Comments: ''
  };

  budgetId = null;

  constructor(
    private route: ActivatedRoute, 
    private nav: NavController, 
    private budgetManagerService: BudgetManagerService, 
    public alertController: AlertController,
    public menuController: MenuController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.budgetId = this.route.snapshot.params['id'];
    if (this.budgetId)  {
      this.loadBudget();
    }
  }

  ionViewWillEnter() {
    //this.menuController.enable(true);
  }

  async loadBudget() {   
    const loading = await this.loadingController.create({
      message: 'Loading Budget..'
    });
    await loading.present();
 
    this.budgetManagerService.getBudget(this.budgetId).subscribe(res => {
      loading.dismiss();
      this.budget = res;
    })
  }

  async saveBudget() {
    const loading = await this.loadingController.create({
      message: 'Saving Budget..'
    });
    await loading.present();
 
    if (this.budgetId) {
      this.budgetManagerService.updateBudget(this.budget, this.budgetId).then(() => {
        loading.dismiss();
        this.nav.back();
      });
    }
  }

  async deleteBudget() {
    this.alertController.create({
      header: "Are you sure you want to delete this budget?",
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.budgetManagerService.removeBudget(this.budgetId).then(() => {
              this.nav.back();
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
