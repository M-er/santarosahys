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

  constructor(
    private router: Router,
    private utilService: UtilService,
    private httpService: HttpService
  ) { }
  ngOnInit() {
    this.path = this.router.url.split('/').splice(1);
    this.init();
  }

  removePoint() {
    console.log("Removiendo punto");
  }
  addPoint() {
    console.log("Agregando punto");
  }
  init() {

    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Line 1',
          data: [1, 2, 3]
        }
      ]
    });

}
}
