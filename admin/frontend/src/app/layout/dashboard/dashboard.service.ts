import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DashboardService {
  nombreUsuario: string;
  constructor() { }
  dameNombre(){return this.nombreUsuario;}
  setNombre(nombre){ this.nombreUsuario = nombre;  }
  onSidenavToggle: EventEmitter<any> = new EventEmitter<any>();
}
