import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DashboardService {

  constructor() { }

  onSidenavToggle: EventEmitter<any> = new EventEmitter<any>();
}
