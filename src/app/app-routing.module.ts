import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { AuthGuard } from './auth.guard';
import { CurrentDamagingEventComponent } from './current-damaging-event/current-damaging-event.component';
import { DamagingEventsComponent } from './damaging-events/damaging-events.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
  { path: 'login', component: LoginScreenComponent },
  { path: '', redirectTo: 'damaging-events', pathMatch: 'full' },
  {
    path: 'damaging-events',
    component: ApplicationComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: CurrentDamagingEventComponent,
        outlet: 'secondary',
        canActivate: [AuthGuard]
      },
      {
        path: '',
        component: DamagingEventsComponent,
        pathMatch: 'full',
        outlet: 'secondary',
        canActivate: [AuthGuard]
      },

    ]
  },
  // { path: 'damaging-events', component: DamagingEventsComponent, outlet:'secondary',  canActivate: [AuthGuard] },
  // { path: '**', redirectTo: '/' }, // falls was falsches eingegeben wird, wird man immer wieder zur Startseite geleitet (wildcard route)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
