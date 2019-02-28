import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
import { HojeadorComponent, HojeadorPrefs } from '@componentes/hojeador';
import { FocusNextDirective } from '@app/shared';
import { environment } from '@env';

@Component({
  selector: 'tr-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  @ViewChild(HojeadorComponent) hojeador: HojeadorComponent;
  hojeadorPrefs: HojeadorPrefs;
  @ViewChildren(FocusNextDirective) focusElements: QueryList<FocusNextDirective>;
  editando: boolean;
  iduser: number;
  path: string[];
  nombuser: string;
  contuser: string;
  contuseN: string;
  tipouser: number;
  imagen : any;
  modificado: boolean;

  tipos = [
    { titulo: 'Admin', valor: '1' },
    { titulo: 'Cliente', valor: '2' },
  ]
  constructor(
    private router: Router,
    private utilService: UtilService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.editando = false;
    this.modificado = false;
    this.path = this.router.url.split('/').splice(1);
    this.init();
  }

  init() {
    this.hojeadorPrefs = {
      columnas: [
        { ancho: 10, def: 'iduser', nombre: 'ID.', tipo: 'texto' },
        { ancho: 25, def: 'nombuser', nombre: 'Nombre', tipo: 'texto' },
        { ancho: 25, def: 'path', nombre: 'Imagen', tipo: 'imagen' },
        { ancho: 15, def: 'tipouser', nombre: 'Tipo de usuario', tipo: 'texto' },
        { ancho: 20, def: 'acciones', nombre: 'Acciones', tipo: 'texto' },
      ],
      url: 'hojeador/usuarios',
      acciones: [
        { title: () => 'Editar', icon: () => 'edit', handler: (element) => { this.editar(element) } }
      ],
      modificarDatos: (datos) => {
        datos.forEach(element => {
          if (!this.modificado){
            element.path = environment.usuariosUrl + element.path;
          }
        });
        this.modificado = true;
        return datos;
      }
    };
    this.hojeador.init(this.hojeadorPrefs);
  }
  clickImagen(imagenInput) {
    if (this.imagen === null) {
      imagenInput.click();
    } else {
      if (this.imagen != environment.usuariosUrl+'nouser.png')
        this.imagen = environment.usuariosUrl + 'nouser.png';
    }
  }
  cargaImagen(ev) {
    this.utilService.leeArchivo(ev.target, 'dataurl', () => {
      this.utilService.notification('Error al cargar la imagen');
    }).then(result => {
      this.imagen = result;
    });
  }
  limpiar() {
    this.iduser = 0;
    this.nombuser = '';
    this.contuser = '';
    this.contuseN = '';
    this.imagen = environment.usuariosUrl +'nouser.png';
  }
  nuevo() {
    this.limpiar();
    this.editando = !this.editando;
  }
  editar(elemento) {
    this.iduser = elemento.iduser;
    this.nombuser = elemento.nombuser;
    this.contuser = elemento.contuser;
    this.contuseN = elemento.contuseN;
    this.tipouser = elemento.tipouser;
    this.path = elemento.path;
    this.imagen = elemento.path;
    this.editando = true;
    console.log(elemento)
  }
}
