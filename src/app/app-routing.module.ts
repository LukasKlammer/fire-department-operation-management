import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentDamagingEventComponent } from './current-damaging-event/current-damaging-event.component';
import { DamagingEventsComponent } from './damaging-events/damaging-events.component';

const routes: Routes = [
  { path: '', component: DamagingEventsComponent },
  { path: ':id', component: CurrentDamagingEventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
