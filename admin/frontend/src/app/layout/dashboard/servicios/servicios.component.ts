import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
import { HojeadorComponent, HojeadorPrefs } from '@componentes/hojeador';
import { FocusNextDirective } from '@app/shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env';

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
    private httpService: HttpService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.path = this.router.url.split('/').splice(1);
    this.init();
    this.editando = false;
  }
  init() {
    this.hojeadorPrefs = {
      columnas: [
        { ancho: 15, def: 'idservicio', nombre: 'ID.', tipo: 'texto' },
        { ancho: 25, def: 'titulo', nombre: 'Titulo', tipo: 'texto' },
        { ancho: 25, def: 'path', nombre: 'Imagen', tipo: 'imagen' },
        { ancho: 15, def: 'habilitado', nombre: 'Habilitado', tipo: 'numero' },
        { ancho: 10, def: 'usuario', nombre: 'Usuario creador', tipo: 'texto' },
        { ancho: 10, def: 'acciones', nombre: 'Acciones', tipo: 'texto' },
      ],
      url: 'hojeador/servicios',
      acciones: [
        { title: () => 'Editar', icon: () => 'edit', handler: (element) => { this.editar(element) } },
        { title: () => 'Eliminar', icon: () => 'delete', handler: (element) => { this.eliminar(element) } }
      ],
      modificarDatos: (datos) => {
        datos.forEach(element => {
          switch (element.user_iduser) {
            case '3':
              element.usuario = "mrivas";
              break;
            case '4':
              element.usuario = "djuarez";
              break;
            case '6':
              element.usuario = "derrecalde";
              break;
          }
          element.path = environment.serviciosUrl + element.idservicio + '/' + element.idservicio + '.jpg';
          element.habilitado = (element.habilitado == '1' || element.habilitado == 'Habilitado') ? 'Habilitado' : 'No habilitado';
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
    this.httpService.post('abm/servicios/eliminar', elemento).then((data) => {
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
    const dialogRef = this.dialog.open(DialogoServicio, {
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
  selector: 'dialog-servicio',
  templateUrl: 'dialogo-servicio.html',
  styleUrls: ['./servicios.component.scss']

})
export class DialogoServicio {
  path = 'img/noimage.png';
  titulo = null;
  user_iduser = 0;
  textohtml = null;
  habilitado = true;
  idservicio: any;
  cambiaImg = false;
  imagen = null;
  imagenU = null;

  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogoServicio>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.idservicio = data.idservicio;
      this.titulo = data.titulo;
      this.imagen = data.path;
      this.textohtml = data.textohtml;
      this.habilitado = data.habilitado;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
  guardar() {
    var formData = new FormData();
    formData.append('idservicio', this.idservicio);
    formData.append('titulo', this.titulo);
    formData.append('textohtml', this.textohtml);
    formData.append('habilitado', this.habilitado ? '1' : '0');
    if (this.cambiaImg)
      formData.append('imagen', this.imagenU, this.imagenU.name);

    this.httpService.post('abm/servicios', formData).then((data) => {
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

