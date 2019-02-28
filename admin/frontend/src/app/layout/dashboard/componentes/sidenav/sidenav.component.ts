import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { collapsible } from '@app/shared';
import { DashboardService } from '../../dashboard.service';
import { MatSidenav } from '@angular/material';
import { Page, Dropdown, Section } from './interfaces';

@Component({
	selector: 'tr-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
	animations: [collapsible]
})
export class SidenavComponent implements OnInit {

	constructor(
		private dashboardService: DashboardService
	) { }

	sections: Section[] = [
		{
			title: 'Informativo',
			children: [
				{ url: '/inicio', title: 'dashboard', icon: 'dashboard' },
				{ url: '/acciones', title: 'acciones', icon: 'table_chart' },
			]
		},
		{
			title: 'Administracion',
			children: [
				{ url: '/perfil', title: 'perfil', icon: 'account_circle' },
				{ url: '/usuarios', title: 'usuarios', icon: 'supervised_user_circle' },
				{ url: '/institucional', title: 'institucional', icon: 'book' },
				{ url: '/productos', title: 'productos', icon: 'shopping_cart' },
				{ url: '/servicios', title: 'servicios', icon: 'feedback' },
				{ url: '/cursos', title: 'cursos', icon: 'class' },
				{ url: '/publicaciones', title: 'publicaciones', icon: 'description' }
			]
		}
	];

	@ViewChild(MatSidenav) snav: MatSidenav;

	ngOnInit() {
		this.dashboardService.onSidenavToggle.subscribe(() => {
			this.snav.toggle();
		});
	}

	isActive(pagina: string | { url: string, titulo: string, activo?: boolean }) {
		if (typeof pagina === 'string') {
			return window.location.pathname.includes(pagina);
		} else {
			return window.location.pathname.includes(pagina.url);
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		if (event.target.innerWidth > 600 && !this.snav.opened) {
			this.snav.open();
		} else if (event.target.innerWidth <= 600 && this.snav.opened) {
			this.snav.close();
		}
	}

}
