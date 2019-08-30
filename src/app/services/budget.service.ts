import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from "angularfire2/auth";
import { AlertController } from '@ionic/angular';

export interface Budget {
  id?: string;
  Category: string;
  SubCategory: string;
  BudgetName: string;
  SearchName: string;
  SearchCategoryName: string;
  SearchSubCategoryName: string;
  TotalCost: number;
  Deposit: number;
  Comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private budgetsCollection: AngularFirestoreCollection<Budget>;
  private budgets: Observable<Budget[]>;  

  constructor(
    public db: AngularFirestore,
    public alertController: AlertController) { 
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
    return BudgetsCollection.doc<Budget>(id).valueChanges();
  }

  addBudget(budget: Budget) {
    var tmp = budget;
    tmp.SearchName = budget.BudgetName.toLowerCase();
    tmp.SearchCategoryName = budget.Category.toLowerCase();
    tmp.SearchSubCategoryName = budget.SubCategory.toLowerCase();
    let rsvpsCollection = this.db.collection('Budgets');
    return rsvpsCollection.add(tmp);
  }

  updateBudget(budget: Budget, id: string) {
    var tmp = budget;
    tmp.SearchName = budget.BudgetName.toLowerCase();
    tmp.SearchCategoryName = budget.Category.toLowerCase();
    tmp.SearchSubCategoryName = budget.SubCategory.toLowerCase();
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
          case "Total": {
            allCost += +data.TotalCost;
            break;
          }
          case "Deposit": {
            allCost += +data.Deposit;
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
          case "Total": {
            tmpcost += +data.TotalCost;
            break;
          }
          case "Deposit": {
            tmpcost += +data.Deposit;
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

}
