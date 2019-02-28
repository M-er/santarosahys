import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
import { HojeadorComponent, HojeadorPrefs } from '@componentes/hojeador';
import { FocusNextDirective } from '@app/shared';

@Component({
  selector: 'tr-institucional',
  templateUrl: './institucional.component.html',
  styleUrls: ['./institucional.component.scss']
})
export class InstitucionalComponent implements OnInit {
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
        { ancho: 10, def: 'idinstitucional', nombre: 'Identificador', tipo: 'texto' },
        { ancho: 10, def: 'titulo', nombre: 'Titulo', tipo: 'texto' },
        { ancho: 20, def: 'categoria', nombre: 'Categoria', tipo: 'texto' },
        { ancho: 10, def: 'path', nombre: 'Pdf', tipo: 'pdf' },
        { ancho: 10, def: 'tipo', nombre: 'Tipo', tipo: 'texto' },
        { ancho: 10, def: 'habilitado', nombre: 'Habilitado', tipo: 'texto' },
        { ancho: 10, def: 'user_iduser', nombre: 'Usuario creador', tipo: 'texto' },
        { ancho: 10, def: 'acciones', nombre: 'Acciones', tipo: 'texto' },
      ],
      url: 'hojeador/institucional',
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
