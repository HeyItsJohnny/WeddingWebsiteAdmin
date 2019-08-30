import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WeddingDayDetailsPage } from './wedding-day-details.page';

const routes: Routes = [
  {
    path: '',
    component: WeddingDayDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeddingDayDetailsPage]
})
export class WeddingDayDetailsPageModule {}
