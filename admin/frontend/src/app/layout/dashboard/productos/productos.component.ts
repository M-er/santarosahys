import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject } from '@angular/core';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
import { HojeadorComponent, HojeadorPrefs } from '@componentes/hojeador';
import { FocusNextDirective } from '@app/shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env';

export interface DialogData {
  respuesta: string;
}

@Component({
  selector: 'tr-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  @ViewChild(HojeadorComponent) hojeador: HojeadorComponent;
  hojeadorPrefs: HojeadorPrefs;
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
        { ancho: 10, def: 'idprod', nombre: 'Id.', tipo: 'texto' },
        { ancho: 10, def: 'nombprod', nombre: 'Titulo', tipo: 'texto' },
        { ancho: 15, def: 'cantprod', nombre: 'Cantidad', tipo: 'numero' },
        { ancho: 10, def: 'path', nombre: 'Imagen', tipo: 'imagen' },
        { ancho: 15, def: 'descripcion', nombre: 'Descripcion', tipo: 'texto' },
        { ancho: 15, def: 'precio', nombre: 'Precio', tipo: 'texto' },
        { ancho: 20, def: 'acciones', nombre: 'Acciones', tipo: 'texto' },
      ],
      url: 'hojeador/productos',
      acciones: [
        { title: () => 'Editar', icon: () => 'edit', handler: (element) => { this.editar(element) } },
        { title: () => 'Eliminar', icon: () => 'delete', handler: (element) => { this.eliminar(element) } }

      ],
      modificarDatos: (datos) => {
        datos.forEach(element => {
          element.path = environment.productosUrl + element.idprod + '/' + element.idprod + '.jpg';
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
    this.httpService.post('abm/producto/eliminar', elemento).then((data) => {
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
    const dialogRef = this.dialog.open(DialogoProducto, {
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
  selector: 'dialog-producto',
  templateUrl: 'dialogo-producto.html',
  styleUrls: ['./productos.component.scss']

})
export class DialogoProducto {
  @ViewChildren(FocusNextDirective) focusElements: QueryList<FocusNextDirective>;

  path = null;
  idprod = 0;
  nombprod = null;
  cantprod = 0;
  user_iduser = 0;
  descripcion = null;
  precio = 0;
  cambiaImg = false;
  imagen = null;
  imagenU = null;

  constructor(
    private utilService: UtilService,
    private httpService: HttpService,
    private http: HttpClient,

    public dialogRef: MatDialogRef<DialogoProducto>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.idprod = data.idprod;
      this.nombprod = data.nombprod;
      this.cantprod = data.cantprod;
      this.imagen = data.imgprod;
      this.user_iduser = data.user_iduser;
      this.descripcion = data.descripcion;
      this.precio = data.precio;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
  guardar() {
    var formData = new FormData();
    formData.append('idprod', this.idprod);
    formData.append('nombprod', this.nombprod);
    formData.append('cantprod', this.cantprod);
    formData.append('user_iduser', this.user_iduser);
    formData.append('descripcion', this.descripcion);
    formData.append('precio', this.precio);

    if (this.cambiaImg)
      formData.append('imagen', this.imagenU, this.imagenU.name);

    this.httpService.post('abm/producto', formData).then((data) => {
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

