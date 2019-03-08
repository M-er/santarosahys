import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HojeadorComponent, HojeadorPrefs } from '@componentes/hojeador';
import { FocusNextDirective } from '@app/shared';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'tr-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.scss']
})
export class AccionesComponent implements OnInit {
  @ViewChild(HojeadorComponent) hojeador: HojeadorComponent;
  hojeadorPrefs: HojeadorPrefs;
  @ViewChildren(FocusNextDirective) focusElements: QueryList<FocusNextDirective>;
  path: string[];
  editando: boolean;

  constructor(private router: Router){ }

  ngOnInit() {
    this.path = this.router.url.split('/').splice(1);
    this.init();
    this.editando = false;
  }
  init() {
    this.hojeadorPrefs = {
      columnas: [
        { ancho: 10, def: 'idlog', nombre: 'Id.', tipo: 'texto' },
        { ancho: 15, def: 'accion', nombre: 'Accion', tipo: 'texto' },
        { ancho: 10, def: 'timestamp', nombre: 'Fecha', tipo: 'fecha' },
        { ancho: 10, def: 'nombuser', nombre: 'Usuario', tipo: 'texto' },
      ],
      modificarDatos: (datos) => {
        datos.forEach(element => {
          element.timestamp = new DatePipe('en').transform(element.timestamp, 'dd/MM/yyyy hh:mm');
        });
        return datos;
      },
      url: 'hojeador/acciones',
    };
    this.hojeador.init(this.hojeadorPrefs);
  }
  
}
