import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
import { environment } from '@env';

@Component({
	selector: 'tr-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	constructor(
		private dashboardService: DashboardService,
		private router: Router,
		private httpService: HttpService,
		private utilService: UtilService

	) { }

	intervalActualizar = null;

	ngOnInit() {
		this.actualizar();
	}

	actualizar() {
		if (!this.intervalActualizar) {
			this.intervalActualizar = setInterval(() => {
				this.actualizar();
			}, 180000);
		}
		this.httpService.get('session/').then((data) => {
			if (data.err === 1) {
				this.utilService.notification('Sesión cerrada');
				this.utilService.setLS('logged', false);
				this.router.navigate(['/auth/login']);
			}
		})
	}
	logout() {

		this.httpService.get('logout/').then((data) => {
			if (data.err === 0) {
				this.utilService.notification('Sesión cerrada');
				this.utilService.setLS('logged', false);
				this.router.navigate(['/auth/login']);
			}
		})

		// if (!environment.production) {
		// 	this.utilService.notification('Sesión cerrada');
		// 	this.utilService.setLS('logged', false);
		// 	// this.login();
		// } else {
		// 	this.httpService.logout().subscribe((res) => {
				
		// 	});
		// }
	}
}
