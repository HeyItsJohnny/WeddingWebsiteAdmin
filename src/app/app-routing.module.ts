import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'admin-home', pathMatch: 'full' },
  { path: 'wedding-day-details', loadChildren: './pages/wedding-day-details/wedding-day-details.module#WeddingDayDetailsPageModule' },
  { path: 'rsvp-details', loadChildren: './pages/rsvp-details/rsvp-details.module#RsvpDetailsPageModule' },
  { path: 'rsvp-details/:id', loadChildren: './pages/rsvp-details/rsvp-details.module#RsvpDetailsPageModule' },
  { path: 'rsvp-list', loadChildren: './pages/rsvp-list/rsvp-list.module#RsvpListPageModule' },
  { path: 'rsvp-guest-list', loadChildren: './pages/rsvp-guest-list/rsvp-guest-list.module#RsvpGuestListPageModule' },
  { path: 'rsvp-guest-list/:id', loadChildren: './pages/rsvp-guest-list/rsvp-guest-list.module#RsvpGuestListPageModule' },
  { path: 'rsvp-guest-details', loadChildren: './pages/rsvp-guest-details/rsvp-guest-details.module#RsvpGuestDetailsPageModule' },
  { path: 'rsvp-guest-details/:id', loadChildren: './pages/rsvp-guest-details/rsvp-guest-details.module#RsvpGuestDetailsPageModule' },
  { path: 'start-new-rsvp', loadChildren: './pages/start-new-rsvp/start-new-rsvp.module#StartNewRsvpPageModule' },
  { path: 'admin-home', loadChildren: './pages/admin-home/admin-home.module#AdminHomePageModule' },
  { path: 'rsvp-diet-restrictions', loadChildren: './pages/rsvp-diet-restrictions/rsvp-diet-restrictions.module#RsvpDietRestrictionsPageModule' },
  { path: 'rsvp-diet-restrictions/:id', loadChildren: './pages/rsvp-diet-restrictions/rsvp-diet-restrictions.module#RsvpDietRestrictionsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
