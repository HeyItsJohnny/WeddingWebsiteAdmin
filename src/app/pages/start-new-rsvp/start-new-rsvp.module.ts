import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StartNewRsvpPage } from './start-new-rsvp.page';

const routes: Routes = [
  {
    path: '',
    component: StartNewRsvpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StartNewRsvpPage]
})
export class StartNewRsvpPageModule {}
