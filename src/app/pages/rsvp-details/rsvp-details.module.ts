import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RsvpDetailsPage } from './rsvp-details.page';

const routes: Routes = [
  {
    path: '',
    component: RsvpDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RsvpDetailsPage]
})
export class RsvpDetailsPageModule {}
