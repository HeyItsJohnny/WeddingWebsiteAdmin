import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WeddingGuestsPage } from './wedding-guests.page';

const routes: Routes = [
  {
    path: '',
    component: WeddingGuestsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeddingGuestsPage]
})
export class WeddingGuestsPageModule {}
