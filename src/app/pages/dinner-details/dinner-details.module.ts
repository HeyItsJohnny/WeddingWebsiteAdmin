import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DinnerDetailsPage } from './dinner-details.page';

const routes: Routes = [
  {
    path: '',
    component: DinnerDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DinnerDetailsPage]
})
export class DinnerDetailsPageModule {}
