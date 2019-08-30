import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BudgetManagerListPage } from './budget-manager-list.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetManagerListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BudgetManagerListPage]
})
export class BudgetManagerListPageModule {}
