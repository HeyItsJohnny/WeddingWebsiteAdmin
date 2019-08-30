import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BudgetManagerDetailsPage } from './budget-manager-details.page';

const routes: Routes = [
  {
    path: '',
    component: BudgetManagerDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BudgetManagerDetailsPage]
})
export class BudgetManagerDetailsPageModule {}
