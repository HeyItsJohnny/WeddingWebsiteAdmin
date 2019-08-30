import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { WeddingDayDetails, WeddingDayDetailsService } from 'src/app/services/wedding-day-details.service';

export interface BudgetManager {
  id?: string;
  Category: string;
  SubCategory: string;
  BudgetName: string;
  BudgetDescription: string;
  SearchName: string;
  SearchCategoryName: string;
  SearchSubCategoryName: string;
  SuggestedPercent: number;
  ActualCost: number;
  SuggestedAmount: number;
  Comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetManagerService {

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

  private budgetsCollection: AngularFirestoreCollection<BudgetManager>;
  private budgets: Observable<BudgetManager[]>;  

  constructor(
    public db: AngularFirestore,
    private weddingDayDetailsService: WeddingDayDetailsService,
    public alertController: AlertController) { 

      var wedDay = this.weddingDayDetailsService.getWeddingDay().subscribe(res => {
        this.weddingDay = res;        
        wedDay.unsubscribe();
      });

      this.budgetsCollection = db.collection('Budgets');
      this.budgets = this.budgetsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    }
  
  getBudgetsToDisplay() {
    return this.budgets;
  }

  getBudgets() {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('Budgets').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots)
      })
    })
  }
  
  getBudget(id) {
    let BudgetsCollection = this.db.collection('Budgets');
    return BudgetsCollection.doc<BudgetManager>(id).valueChanges();
  }

  addBudget(budget: BudgetManager) {
    var tmp = budget;
    tmp.SearchName = budget.BudgetName.toLowerCase();
    tmp.SearchCategoryName = budget.Category.toLowerCase();
    tmp.SearchSubCategoryName = budget.SubCategory.toLowerCase();
    tmp.SuggestedAmount = this.getBudgetAmount(tmp.SuggestedPercent);
    let rsvpsCollection = this.db.collection('Budgets');
    return rsvpsCollection.add(tmp);
  }

  updateBudget(budget: BudgetManager, id: string) {
    var tmp = budget;
    tmp.SearchName = budget.BudgetName.toLowerCase();
    tmp.SearchCategoryName = budget.Category.toLowerCase();
    tmp.SearchSubCategoryName = budget.SubCategory.toLowerCase();
    tmp.SuggestedAmount = this.getBudgetAmount(tmp.SuggestedPercent);
    let BudgetsCollection = this.db.collection('Budgets');
    return BudgetsCollection.doc(id).update(tmp);
  }

  removeBudget(id) {
    let BudgetsCollection = this.db.collection('Budgets');
    return BudgetsCollection.doc(id).delete();
  }

  searchBudgetName(searchValue){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('Budgets', ref => ref.where('SearchName', '>=', searchValue)
      .where('SearchName', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
  }

  searchBudgetCategoryName(searchValue){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('Budgets', ref => ref.where('SearchCategoryName', '>=', searchValue)
      .where('SearchCategoryName', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
  }
  
  searchBudgetSubCategoryName(searchValue){
    return new Promise<any>((resolve, reject) => {
      this.db.collection('Budgets', ref => ref.where('SearchSubCategoryName', '>=', searchValue)
      .where('SearchSubCategoryName', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    })
  }

  getAllChartData(chartType:string) {
    return this.getBudgets().then(events => {
      var singlecost = events.map(a => {
        var allCost = 0;
        const data = a.payload.doc.data();
        switch(chartType) {
          case "Actual": {
            allCost += +data.ActualCost;
            break;
          }
          case "SuggestPercent": {
            allCost += +data.SuggestedPercent;
            break;
          }
          case "BudgetAmount": {
            allCost += +data.BudgetAmount;
            break;
          }
        }
        return {
          SingleCost: allCost
        }
      });
      var y = 0;
      for (let x of singlecost) {
        y += +x.SingleCost;
      }
      return {
        TotalCost: y
      }
    });
  }

  getChartData(category:string, chartType:string) {
    return this.searchBudgetCategoryName(category.toLowerCase()).then(res => {
      var singlecost = res.map(a => {
        var tmpcost = 0;
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        switch(chartType) {
          case "Actual": {
            tmpcost += +data.ActualCost;
            break;
          }
          case "SuggestPercent": {
            tmpcost += +data.SuggestedPercent;
            break;
          }
          case "BudgetAmount": {
            tmpcost += +data.BudgetAmount;
            break;
          }
        }
        return {
          SingleCost: tmpcost
        }
      });  
      var y = 0;
      for (let x of singlecost) {
        y += +x.SingleCost;
      }
      return {
        TotalCost: y
      }
    });    
  }

  getBudgetAmount(percent:number) {
    return percent * 0.01 * this.weddingDay.BudgetEstimate;
  }
}
