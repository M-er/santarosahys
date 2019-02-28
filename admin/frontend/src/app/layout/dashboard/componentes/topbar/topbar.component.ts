import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';

@Component({
	selector: 'tr-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

	constructor(
		private dashboardService: DashboardService,
		private utilService: UtilService,
		private httpService: HttpService,
		private router: Router
	) { }

	ngOnInit() {
	}

	toggleSidenav() {
		this.dashboardService.onSidenavToggle.emit();
	}

	logout() {
		this.httpService.get('logout/').then((data) => {
			if (data.err === 0) {
				this.utilService.setLS('logged', false);
				this.router.navigate(['auth/login']);
				console.log("hey")
			}
		});
	}
}
