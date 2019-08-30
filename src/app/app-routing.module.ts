import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'dinner-list', loadChildren: './pages/dinner-list/dinner-list.module#DinnerListPageModule' },
  { path: 'dinner-details', loadChildren: './pages/dinner-details/dinner-details.module#DinnerDetailsPageModule' },
  { path: 'dinner-details/:id', loadChildren: './pages/dinner-details/dinner-details.module#DinnerDetailsPageModule' },
  { path: 'wedding-day-details', loadChildren: './pages/wedding-day-details/wedding-day-details.module#WeddingDayDetailsPageModule' },
  { path: 'rsvp-details', loadChildren: './pages/rsvp-details/rsvp-details.module#RsvpDetailsPageModule' },
  { path: 'rsvp-details/:id', loadChildren: './pages/rsvp-details/rsvp-details.module#RsvpDetailsPageModule' },
  { path: 'rsvp-list', loadChildren: './pages/rsvp-list/rsvp-list.module#RsvpListPageModule' },
  { path: 'rsvp-guest-list', loadChildren: './pages/rsvp-guest-list/rsvp-guest-list.module#RsvpGuestListPageModule' },
  { path: 'rsvp-guest-list/:id', loadChildren: './pages/rsvp-guest-list/rsvp-guest-list.module#RsvpGuestListPageModule' },
  { path: 'rsvp-guest-details', loadChildren: './pages/rsvp-guest-details/rsvp-guest-details.module#RsvpGuestDetailsPageModule' },
  { path: 'rsvp-guest-details/:id', loadChildren: './pages/rsvp-guest-details/rsvp-guest-details.module#RsvpGuestDetailsPageModule' },
  { path: 'start-new-rsvp', loadChildren: './pages/start-new-rsvp/start-new-rsvp.module#StartNewRsvpPageModule' },
  { path: 'budget-manager-list', loadChildren: './pages/budget-manager-list/budget-manager-list.module#BudgetManagerListPageModule' },
  { path: 'budget-manager-details', loadChildren: './pages/budget-manager-details/budget-manager-details.module#BudgetManagerDetailsPageModule' },
  { path: 'budget-manager-details/:id', loadChildren: './pages/budget-manager-details/budget-manager-details.module#BudgetManagerDetailsPageModule' },
  { path: 'admin-home', loadChildren: './pages/admin-home/admin-home.module#AdminHomePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
