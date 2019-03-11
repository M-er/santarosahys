import { Component, OnInit } from '@angular/core';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'tr-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  path: string[];
  chart: Chart;
  curso_col = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  usuario_col = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  servicio_col = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  producto_col = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  publicacion_col = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
  institucional_col = [Math.random() * 256, Math.random() * 256, Math.random() * 256];

  constructor(
    private router: Router,
    private utilService: UtilService,
    private httpService: HttpService
  ) { }
  ngOnInit() {
    this.path = this.router.url.split('/').splice(1);
    this.httpService.get('acciones').then((data) => {
      data.acciones.forEach(element => {
        var queEs = element.name.split(' ');
        switch (queEs[0]) {
          case 'Creacion': element.color = this.dameColor(1, queEs[queEs.length - 1]); break;
          case 'Eliminacion': element.color = this.dameColor(0, queEs[queEs.length - 1]); break;
          default: break;
        }
      });
      this.chartMaker(data.acciones);
    })
  }
  dameColor(tipo, accion) {
    var color;
    switch (accion) {
      case 'curso':
        color = this.curso_col;
        if (tipo) color = this.getRandColor(color, 5);
        else color = this.getRandColor(color, 2);
        break;
      case 'usuario':
        color = this.usuario_col;
        if (tipo) color = this.getRandColor(color, 5);
        else color = this.getRandColor(color, 2);
        break;
      case 'servicio':
        color = this.servicio_col;
        if (tipo) color = this.getRandColor(color, 5);
        else color = this.getRandColor(color, 2);
        break;
      case 'publicacion':
        color = this.publicacion_col;
        if (tipo) color = this.getRandColor(color, 5);
        else color = this.getRandColor(color, 2);
        break;
      case 'producto':
        color = this.producto_col;
        if (tipo) color = this.getRandColor(color, 5);
        else color = this.getRandColor(color, 2);
        break;
      case 'institucional':
        color = this.institucional_col;
        if (tipo) color = this.getRandColor(color, 5);
        else color = this.getRandColor(color, 2);
        break;
    }
    return color;
  }
  getRandColor(color, darkness) {
    var mix = [darkness * 51, darkness * 51, darkness * 51]; //51 => 255/5
    var mixedrgb = [color[0] + mix[0], color[1] + mix[1], color[2] + mix[2]].map(function (x) {
      return Math.round(x / 2.0)
    })
    return "rgb(" + mixedrgb.join(",") + ")";
  }
  removePoint() {
    console.log("Removiendo punto");
  }
  addPoint() {
    console.log("Agregando punto");
  }
  chartMaker(datos) {
    this.chart = new Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: { text: 'Acciones realizadas' },
      tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: { enabled: false },
          showInLegend: true
        }
      },
      series: [{ name: 'Acciones', colorByPoint: true, data: datos, type: 'pie' }]
    });
  }
}
