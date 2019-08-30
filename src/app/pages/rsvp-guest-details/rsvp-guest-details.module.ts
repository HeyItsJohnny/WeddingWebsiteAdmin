import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RsvpGuestDetailsPage } from './rsvp-guest-details.page';

const routes: Routes = [
  {
    path: '',
    component: RsvpGuestDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RsvpGuestDetailsPage]
})
export class RsvpGuestDetailsPageModule {}
