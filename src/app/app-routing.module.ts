import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { CurrentDamagingEventComponent } from './current-damaging-event/current-damaging-event.component';
import { DamagingEventsComponent } from './damaging-events/damaging-events.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';
import { GaugeStationsComponent } from './gauge-stations/gauge-stations.component';
import { PrecipitationComponent } from './precipitation/precipitation.component';

const routes: Routes = [
  { path: '', component: LoginScreenComponent },
  { path: 'login', component: LoginScreenComponent },
  {
    path: 'damaging-events',
    component: ApplicationComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: ':id',
        component: CurrentDamagingEventComponent,
        outlet: 'secondary',
        canActivate: [LoggedInGuard]
      },
      {
        path: '',
        component: DamagingEventsComponent,
        pathMatch: 'full',
        outlet: 'secondary',
        canActivate: [LoggedInGuard]
      },
    ]
  },
  {
    path: 'gauge-stations',
    component: ApplicationComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: '',
        component: GaugeStationsComponent,
        pathMatch: 'full',
        outlet: 'secondary',
        canActivate: [LoggedInGuard]
      },
    ]
  },
  {
    path: 'precipitation',
    component: ApplicationComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: '',
        component: PrecipitationComponent,
        pathMatch: 'full',
        outlet: 'secondary',
        canActivate: [LoggedInGuard]
      },
    ]
  },
  { path: '**', redirectTo: 'login' }, // wildcard-route: if wrong url entered --> redirect to login component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
