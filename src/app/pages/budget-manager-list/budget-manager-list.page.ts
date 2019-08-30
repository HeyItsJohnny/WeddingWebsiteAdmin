import { Component } from '@angular/core';
import { BudgetManager, BudgetManagerService } from 'src/app/services/budget-manager.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-budget-manager-list',
  templateUrl: './budget-manager-list.page.html',
  styleUrls: ['./budget-manager-list.page.scss'],
})
export class BudgetManagerListPage {
  budgets: BudgetManager[];
  searchCategory: string;

  TotalCost: string;
  TotalOverUnderBudget: string;

  categoryArray: string[] = ["Reception","Ceremony","Apparel/Bride","Apparel/Groom","Wedding Rings","Photographer","Videographer","Flowers","Entertainment","Stationary","Accessories","Gifts","Transportation","Beauty","Optional","Overages"];
  receptionArray: string[] = ["Bar","Cake","Catering","Facility Rental","Rentail Items","Other"];
  ceremonyArray: string[] = ["Aisle Runner","Candles/etc.","Facility Rental","Officiant","Marriage License","Other"];
  apparelBrideArray: string[] = ["Alterations","Gown","Headpiece/Veil","Jewelry","Lingerie","Shoes","Bridemaids","Flower Girl","Mothers"];
  apparelGroomArray: string[] = ["Formalwear","Accessories","Groomsmens"];
  weddingRingsArray: string[] = ["Bride","Groom"];
  photographerArray: string[] = ["Fees/Prints","Other"];
  videographerArray: string[] = ["Fee/Copies","Other"];
  flowersArray: string[] = ["Attendee Bouquents","Bride Bouquent","Flower Girl Basket","Ceremony","Tables","Other"];
  entertainmentArray: string[] = ["Ceremony","Cocktail Hour","Reception","Other"];
  stationaryArray: string[] = ["Invintations","Save-The-Dates","Maps","Wedding Program","Postage","Thank You","Other"];
  accessoriesArray: string[] = ["Cake Knife/Server","Favors","Guest Book/Pen","Toast Flute","Other"];
  giftsArray: string[] = ["Attendants","Groomsmen","Bridemaids","Parents","Pre-Wedding Hosts","Musicians","Other"];
  transportationArray: string[] = ["Flights","Limousine","Other"];
  beautyArray: string[] = ["Hair & Makeup","Mani/Pedi","Other"];
  optionalArray: string[] = ["Wedding Coordinator","Wedding Insurance","Other"];
  overagesArray: string[] = ["Tax/Tips","Other"];

  constructor(
    private budgetManagerService: BudgetManagerService,
    private router: Router,
    public menuController: MenuController,
    public alertController: AlertController) { }
  
  ionViewWillEnter() {
    //this.menuController.enable(true);
    this.getBudgetData(); 
  }

  getBudgetData() {
    this.budgetManagerService.getBudgets()
    .then(events => {
      this.budgets = events;
    })
  }

  async addItem() {
    var options = {
      header: "Budget Category",
      subHeader: "Please select a budget category",
      inputs: [],
      buttons: [
        {
          text: 'Ok',
          handler: (data: any) => {
            this.startSubcategorySelection(data);
            this.getBudgetData();
          }
        }
      ]
    };
  
    for (let item of this.categoryArray) {
      options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
    }

    let alert = await this.alertController.create(options);
    await alert.present();
  }

  async startSubcategorySelection(category: string) {
    var options = {
      header: category + " Subcategory",
      inputs: [],
      buttons: [
        {
          text: 'Ok',
          handler: (data: any) => {
            this.subcategoryOtherLogic(category,data);
            this.getBudgetData();
          }
        }
      ]
    };
  

    switch(category) {
      case "Reception": {
        for (let item of this.receptionArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Ceremony": {
        for (let item of this.ceremonyArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Apparel/Bride": {
        for (let item of this.apparelBrideArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Wedding Rings": {
        for (let item of this.weddingRingsArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Apparel/Groom": {
        for (let item of this.apparelGroomArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Photographer": {
        for (let item of this.photographerArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Videographer": {
        for (let item of this.videographerArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Flowers": {
        for (let item of this.flowersArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Entertainment": {
        for (let item of this.entertainmentArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Stationary": {
        for (let item of this.stationaryArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Accessories": {
        for (let item of this.accessoriesArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Gifts": {
        for (let item of this.giftsArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Transportation": {
        for (let item of this.transportationArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Beauty": {
        for (let item of this.beautyArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Optional": {
        for (let item of this.optionalArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
      case "Overages": {
        for (let item of this.overagesArray) {
          options.inputs.push({ name : item, value: item , label: item, type: 'radio'});
        }
        break;
      }
    }

    let alert = await this.alertController.create(options);
    await alert.present();
  }

  subcategoryOtherLogic(category: string, subcategory: string) {
    if (subcategory == "Other") {
      this.AddSubcategoryOtherName(category);
    } else {
      this.AddBudget(category,subcategory);
    }
  }
 
  AddSubcategoryOtherName(category: string) {
    this.alertController.create({
      header: 'Please enter a subcategory',
      inputs: [
        {
          name: 'subcategory',
          type: 'text',
          placeholder: 'Subcategory'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.AddBudget(category, data.subcategory);   
            this.getBudgetData();  
          }
        }
      ]
    }).then(alert => alert.present());
  }

  AddBudget(category: string, subcategory: string) {
    this.alertController.create({
      header: 'Please enter budget details',
      inputs: [
        {
          name: 'category',
          value: category,
          type: 'text',
          disabled: true,
          placeholder: 'Category'
        },
        {
          name: 'subcategory',
          value: subcategory,
          type: 'text',
          disabled: true,
          placeholder: 'Subcategory'
        },
        {
          name: 'budgetname',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'budgetdescription',
          type: 'text',
          placeholder: 'Description'
        },
        {
          name: 'suggestedpercent',
          type: 'number',
          placeholder: 'Suggested %'
        },
        {
          name: 'actualcost',
          type: 'number',
          placeholder: 'Actual Cost'
        },
        {
          name: 'comments',
          type: 'text',
          placeholder: 'Comments'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            var budObj: BudgetManager = {
              Category: data.category,
              SubCategory: data.subcategory,
              BudgetName: data.budgetname,
              BudgetDescription: data.budgetdescription,
              SearchCategoryName: '',
              SearchSubCategoryName: '',
              SearchName: '',
              SuggestedPercent: data.suggestedpercent,
              ActualCost: data.actualcost,
              SuggestedAmount: 0,
              Comments: data.comments
            };       
            this.budgetManagerService.addBudget(budObj);  
            this.budgets.push(budObj);
            this.getBudgetData();
          }
        }
      ]
    }).then(alert => alert.present());
  }

  getItems(searchbar) {
    console.log("Saerch Category: " + this.searchCategory);
    if (searchbar.srcElement.value == "") {
      this.getBudgetData();
    } else {
      var value = searchbar.srcElement.value;
      var valueTmp: string;
      valueTmp = value.toLowerCase();   
  
      if ((this.searchCategory == 'category') || (this.searchCategory == null)) {
        this.budgetManagerService.searchBudgetCategoryName(valueTmp).then(res => {
          this.budgets = res;
        })
      } else if (this.searchCategory == 'subcategory') {
        this.budgetManagerService.searchBudgetSubCategoryName(valueTmp).then(res => {
          this.budgets = res;
        })
      } else if (this.searchCategory == 'budgetName') {
        this.budgetManagerService.searchBudgetName(valueTmp).then(res => {
          this.budgets = res;
        })
      } 
    }
  }

  viewDetails(item){
    this.router.navigateByUrl('/budget-manager-details/' + item.payload.doc.id);
  }

}
