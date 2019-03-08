import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
import { HojeadorComponent, HojeadorPrefs } from '@componentes/hojeador';
import { FocusNextDirective } from '@app/shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env';

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
        { ancho: 10, def: 'idinstitucional', nombre: 'Identificador', tipo: 'texto' },
        { ancho: 10, def: 'titulo', nombre: 'Titulo', tipo: 'texto' },
        { ancho: 20, def: 'categoria', nombre: 'Categoria', tipo: 'texto' },
        {
          ancho: 10, def: 'path', nombre: 'Pdf', tipo: 'boton', accion: [{
            title: () => 'PDF', icon: () => 'picture_as_pdf', handler: (element) => {
          window.open(environment.pdfUrl + element, '_blank');
        } }]},
        { ancho: 10, def: 'habilitado', nombre: 'Habilitado', tipo: 'texto' },
        { ancho: 10, def: 'usuario', nombre: 'Usuario creador', tipo: 'texto' },
        { ancho: 10, def: 'acciones', nombre: 'Acciones', tipo: 'texto' },
      ],
      url: 'hojeador/institucional',
      acciones: [
        { title: () => 'Editar', icon: () => 'edit', handler: (element) => { this.editar(element) } },
        { title: () => 'Eliminar', icon: () => 'delete', handler: (element) => { this.eliminar(element) } }
      ],
      modificarDatos: (datos) => {
        datos.forEach(element => {
          element.path = element.idinstitucional+'.pdf';
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
    this.httpService.post('abm/institucional/eliminar', elemento).then((data) => {
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
    const dialogRef = this.dialog.open(DialogoInstitucional, {
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
  selector: 'dialog-institucional',
  templateUrl: 'dialogo-institucional.html',
  styleUrls: ['./institucional.component.scss']

})
export class DialogoInstitucional {
  idinstitucional: any;
  titulo = null;
  user_iduser: any;
  categoria = null;
  habilitado = true;
  cambiaPdf = false;
  pdf = null;
  pdfU = null;
  pathPdf = '/assets/img/nopdf.png';
  categorias: string[] = [
    'De la construcción',
    'Del agro',
    'De la mineria',
    'Enfermedades profesionales',
    'Leyes generales',
    'Protocolos',
    'Servicios de salud y seguridad'
  ];

  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogoInstitucional>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.idinstitucional = data.idinstitucional;
      this.titulo = data.titulo;
      this.user_iduser = data.user_iduser;
      this.categoria = data.categoria;
      this.habilitado = data.habilitado;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
  guardar() {
    var formData = new FormData();
    formData.append('idinstitucional', this.idinstitucional);
    formData.append('titulo', this.titulo);
    formData.append('categoria', this.categoria);
    formData.append('habilitado', this.habilitado ? '1' : '0');
    if (this.cambiaPdf)
      formData.append('pdf', this.pdfU, this.pdfU.name);

    this.httpService.post('abm/institucional', formData).then((data) => {
      if (data.err) {
        this.data.respuesta = "Error";
      } else {
        this.data.respuesta = data.msg;
      }
      this.dialogRef.close();
    });
  }

  clickPdf(pdfInput) {
    if (this.pdf === null) { 
      pdfInput.click(); 
      this.cambiaPdf = true; 
    } else {
      this.pdf = null;
      this.pathPdf = '/assets/img/nopdf.png'; 
      }
  }

  cargaPdf(ev) {
    this.utilService.leeArchivo(ev.target, 'dataurl', () => {
      this.utilService.notification('Error al cargar la pdf');
    }).then(result => {
      this.pathPdf = '/assets/img/pdf.png';
      this.pdf = result;
      this.pdfU = ev.target.files[0];
    });
  }
}

