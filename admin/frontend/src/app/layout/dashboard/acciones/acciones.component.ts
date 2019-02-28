import { Component, OnInit } from '@angular/core';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
@Component({
  selector: 'tr-acciones',
  templateUrl: './acciones.component.html',
  styleUrls: ['./acciones.component.scss']
})
export class AccionesComponent implements OnInit {
  path: string[];
  constructor(
    private router: Router,
    private utilService: UtilService,
    private httpService: HttpService
  ) { }
  ngOnInit() {
    this.path = this.router.url.split('/').splice(1);
  }

}
