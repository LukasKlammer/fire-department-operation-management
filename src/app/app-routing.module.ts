import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CurrentDamagingEventComponent } from './current-damaging-event/current-damaging-event.component';
import { DamagingEventsComponent } from './damaging-events/damaging-events.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: 'login', component: UserProfileComponent },
  { path: '', component: DamagingEventsComponent,  canActivate: [AuthGuard] },
  { path: ':id', component: CurrentDamagingEventComponent,  canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' }, // falls was falsches eingegeben wird, wird man immer wieder zur Startseite geleitet (wildcard route)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
