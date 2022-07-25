import { Injectable } from '@angular/core';
import { DamagingEvent } from '../modules/damaging-event.class';

@Injectable({
  providedIn: 'root'
})
export class UserSelectionsService {

  selectedDamagingEvent: DamagingEvent = new DamagingEvent({
    description: '',
    timestamp: '',
    customIdName: '',
  });

  isDamagingEventSelected: boolean = false;

  constructor() { }
}
