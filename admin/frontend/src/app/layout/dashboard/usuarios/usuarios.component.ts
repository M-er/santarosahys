import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
import { HojeadorComponent, HojeadorPrefs } from '@componentes/hojeador';
import { FocusNextDirective } from '@app/shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env';

@Component({
  selector: 'tr-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  @ViewChild(HojeadorComponent) hojeador: HojeadorComponent;
  hojeadorPrefs: HojeadorPrefs;
  editando: boolean;
  modificado: boolean;
  path = null;

  constructor(
    private router: Router,
    private utilService: UtilService,
    private httpService: HttpService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.path = this.router.url.split('/').splice(1);
    this.editando = false;
    this.modificado = false;
    this.init();
  }

  init() {
    this.hojeadorPrefs = {
      columnas: [
        { ancho: 10, def: 'iduser', nombre: 'ID.', tipo: 'texto' },
        { ancho: 25, def: 'nombuser', nombre: 'Nombre', tipo: 'texto' },
        { ancho: 25, def: 'path', nombre: 'Imagen', tipo: 'imagen' },
        { ancho: 15, def: 'tipo', nombre: 'Tipo de usuario', tipo: 'texto' },
        { ancho: 20, def: 'acciones', nombre: 'Acciones', tipo: 'texto' },
      ],
      url: 'hojeador/usuarios',
      acciones: [
        { title: () => 'Editar', icon: () => 'edit', handler: (element) => { this.editar(element) } },
        { title: () => 'Eliminar', icon: () => 'delete', handler: (element) => { this.eliminar(element) } }
      ],
      modificarDatos: (datos) => {
        datos.forEach(element => {
          switch (element.tipouser) {
            case '1':
              element.tipo = "Admin";
              break;
            case '2':
              element.tipo = "Cliente";
              break;
            default:
              element.tipo = "Cliente";
              break;
          }
          element.path = environment.usuariosUrl + '/' + element.iduser + '.jpg';
        });
        return datos;
      }
    };
    this.hojeador.init(this.hojeadorPrefs);
  }
  limpiar() {
    console.log("limpieza")
  }
  eliminar(elemento) {
    this.httpService.post('abm/usuario/eliminar', elemento).then((data) => {
      this.utilService.notification(data.msg);
      this.init();
    });
  }
  nuevo(datos) {
    if (!datos) {
      datos = {};
    }
    this.limpiar();
    this.editando = !this.editando;
    const dialogRef = this.dialog.open(DialogoUsuario, {
      width: '750px',
      data: datos
    });

    dialogRef.afterClosed().subscribe(result => {
      this.init();
      this.editando = false;
    });
  }
  editar(elemento) {
    this.nuevo(elemento);
  }
}
@Component({
  selector: 'dialog-usuario',
  templateUrl: 'dialogo-usuario.html',
  styleUrls: ['./usuarios.component.scss']

})
export class DialogoUsuario {
  @ViewChildren(FocusNextDirective) focusElements: QueryList<FocusNextDirective>;

  iduser: any;
  path = '/assets/img/nouser.png';
  nombuser = null;
  contuser = null;
  contuserN = null;
  tipouser: any;
  cambiaImg = false;
  imagen = null;
  imagenU = null;
  tipos = [
    { titulo: 'Admin', valor: '1' },
    { titulo: 'Cliente', valor: '2' },
  ]

  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogoUsuario>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.iduser = data.iduser;
      this.nombuser = data.nombuser;
      this.imagen = data.path;
      this.contuser = data.contuser;
      this.tipouser = data.tipouser;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
  guardar() {
    var formData = new FormData();
    formData.append('iduser', this.iduser);
    formData.append('nombuser', this.nombuser);
    formData.append('contuser', this.contuser);
    formData.append('tipouser', this.tipouser);
    if (this.cambiaImg)
      formData.append('imagen', this.imagenU, this.imagenU.name);
    this.httpService.post('abm/usuario', formData).then((data) => {
      if (data.err) {
        this.data.respuesta = "Error";
      } else {
        this.data.respuesta = data.msg;
      }
      this.dialogRef.close();
    });
  }
  clickImagen(imagenInput) {
    if (this.imagen === null) { imagenInput.click(); this.cambiaImg = true; } else { this.imagen = null; }
  }
  cargaImagen(ev) {
    this.utilService.leeArchivo(ev.target, 'dataurl', () => {
      this.utilService.notification('Error al cargar la imagen');
    }).then(result => {
      this.imagen = result;
      this.imagenU = ev.target.files[0];
    });
  }
}