import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RsvpGuestListPage } from './rsvp-guest-list.page';

const routes: Routes = [
  {
    path: '',
    component: RsvpGuestListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RsvpGuestListPage]
})
export class RsvpGuestListPageModule {}
