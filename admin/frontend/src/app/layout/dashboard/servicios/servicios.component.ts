import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
import { HojeadorComponent, HojeadorPrefs } from '@componentes/hojeador';
import { FocusNextDirective } from '@app/shared';

@Component({
  selector: 'tr-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss']
})
export class ServiciosComponent implements OnInit {
  @ViewChild(HojeadorComponent) hojeador: HojeadorComponent;
  hojeadorPrefs: HojeadorPrefs;
  @ViewChildren(FocusNextDirective) focusElements: QueryList<FocusNextDirective>;
  path: string[];
  editando: boolean;

  constructor(
    private router: Router,
    private utilService: UtilService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.path = this.router.url.split('/').splice(1);
    this.init();
    this.editando = false;
  }
  init() {
    this.hojeadorPrefs = {
      columnas: [
        { ancho: 10, def: 'idservicio', nombre: 'Identificador', tipo: 'texto' },
        { ancho: 10, def: 'titulo', nombre: 'Titulo', tipo: 'texto' },
        { ancho: 10, def: 'path', nombre: 'Path', tipo: 'imagen' },
        { ancho: 10, def: 'url', nombre: 'URL', tipo: 'texto' },
        { ancho: 10, def: 'habilitado', nombre: 'Habilitado', tipo: 'numero' },
        { ancho: 10, def: 'textohtml', nombre: 'Textohtml', tipo: 'texto' },
        { ancho: 10, def: 'user_iduser', nombre: 'Usuario creador', tipo: 'texto' },
        { ancho: 10, def: 'acciones', nombre: 'Acciones', tipo: 'texto' },
      ],
      url: 'hojeador/servicios',
      acciones: [
        { title: () => 'Editar', icon: () => 'edit', handler: (element) => { this.editar(element) } }
      ]
    };
    this.hojeador.init(this.hojeadorPrefs);
  }
  limpiar() {
    console.log("limpieza")
  }
  nuevo() {
    this.limpiar();
    this.editando = !this.editando;
  }
  editar(elemento) {
    this.editando = true;
    console.log(elemento)
  }

}
