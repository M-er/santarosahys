import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
import { HojeadorComponent, HojeadorPrefs } from '@componentes/hojeador';
import { FocusNextDirective } from '@app/shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'tr-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit {
  @ViewChild(HojeadorComponent) hojeador: HojeadorComponent;
  hojeadorPrefs: HojeadorPrefs;
  @ViewChildren(FocusNextDirective) focusElements: QueryList<FocusNextDirective>;
  path: string[];
  editando: boolean;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private utilService: UtilService,
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
        { ancho: 10, def: 'idpublicacion', nombre: 'Identificador', tipo: 'texto' },
        { ancho: 20, def: 'titulo', nombre: 'Titulo', tipo: 'texto' },
        { ancho: 10, def: 'path', nombre: 'Imagen', tipo: 'imagen' },
        { ancho: 20, def: 'habilitado', nombre: 'Habilitado', tipo: 'texto' },
        { ancho: 10, def: 'fecha', nombre: 'Fecha', tipo: 'texto' },
        { ancho: 10, def: 'nombuser', nombre: 'Usuario creador', tipo: 'texto' },
        { ancho: 10, def: 'acciones', nombre: 'Acciones', tipo: 'texto' },
      ],
      url: 'hojeador/publicaciones',
      acciones: [
        { title: () => 'Editar', icon: () => 'edit', handler: (element) => { this.editar(element) } },
        { title: () => 'Eliminar', icon: () => 'delete', handler: (element) => { this.eliminar(element) } }
      ],
      modificarDatos: (datos) => {
        datos.forEach(element => {
          element.path = environment.publicacionesUrl + element.idpublicacion + '/' + element.idpublicacion + '.jpg';
          element.habilitado = (element.habilitado == '1' || element.habilitado == 'Habilitada') ? 'Habilitada' : 'No habilitada';
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
    this.httpService.post('abm/publicacion/eliminar', elemento).then((data) => {
      this.utilService.notification(data.msg);
      this.init();
    });
  }
  nueva(datos) {
    if (!datos) {
      datos = {};
    }
    this.limpiar();
    this.editando = !this.editando;
    const dialogRef = this.dialog.open(DialogoNoticia, {
      width: '750px',
      data: datos
    });

    dialogRef.afterClosed().subscribe(result => {
      this.init();
      this.editando = false;
    });
  }
  editar(elemento) {
    this.nueva(elemento);
  }
}
@Component({
  selector: 'dialog-publicacion',
  templateUrl: 'dialogo-publicacion.html',
  styleUrls: ['./publicaciones.component.scss']

})
export class DialogoNoticia {
  step = 0;
  url = null;
  path = 'img/nopub.png';
  fecha = null;
  titulo = null;
  user_iduser = 0;
  textohtml = null;
  habilitado = true;
  idpublicacion: any;
  cambiaImg = false;
  imagen = null;
  imagenU = null;
  tituloThumb = 'Con el cual los lectores identificarán la publicacion';
  imagenThumb = 'Que tendrá de portada la publicacion';
  publicacionThumb = 'Texto completo de la publicacion';

  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogoNoticia>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.idpublicacion = data.idpublicacion;
      this.titulo = data.titulo;
      this.imagen = data.path;
      this.textohtml = data.textohtml;
      this.habilitado = data.habilitado;
    }
    console.log(data)
  }

  cancelar() {
    this.dialogRef.close();
  }
  guardar() {
    var formData = new FormData();
    formData.append('idpublicacion', this.idpublicacion);
    formData.append('titulo', this.titulo);
    formData.append('textohtml', this.textohtml);
    formData.append('habilitado', this.habilitado ? '1' : '0');
    if (this.cambiaImg)
      formData.append('imagen', this.imagenU, this.imagenU.name);

    this.httpService.post('abm/publicacion', formData).then((data) => {
      if (data.err) {
        this.data.respuesta = "Error";
      } else {
        this.data.respuesta = data.msg;
      }
      this.dialogRef.close();
    });
  }

  setStep(index: number) { this.step = index; }
  nextStep() { this.step++; }
  prevStep() { this.step--; }

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
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Ingrese el texto de la publicación',
    translate: 'no'
  };
}

