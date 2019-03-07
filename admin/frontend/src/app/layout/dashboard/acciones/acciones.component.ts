import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { UtilService, HttpService } from '@app/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

export interface Accion {
  fecha: string;
  tipo: string;
  accion: string;
  usuario: string;
}

var ELEMENT_DATA: Accion[] = [
  { fecha: '', tipo: '', accion: '', usuario: '' },
];

//[2019 - 03 - 03 16: 50: 00] dyd - backend - app.INFO: Eliminacion de documentacion institucional | mrivas[] { "uid": "795814d" }

@Component({
  selector: 'tr-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.scss']
})

//  

export class AccionesComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'tipo', 'accion', 'usuario'];
  dataSource = new MatTableDataSource<Accion>(ELEMENT_DATA);
  cargando = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private httpService: HttpService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.cargaArchivo();
  }
  cargaArchivo() {
    this.httpService.get('hojeador/acciones').then((data) => {
      if (data.err) {
        this.utilService.notification('Error al traer los datos');
      } else {
        data.acciones.forEach(element => {
          console.log(element.acciones)
        });
        var fila = { fecha: '2017', tipo: 'elTipo', accion: 'Ninguna', usuario: 'ElUsuario' }
        ELEMENT_DATA.push(fila);
        this.dataSource.disconnect();
        this.dataSource.connect();
        this.dataSource = new MatTableDataSource<Accion>(ELEMENT_DATA);
        this.cargando = false;
        console.log("Tengo")
        console.log(ELEMENT_DATA);
      }
    });
  }
}




