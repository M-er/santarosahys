import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@app/shared/shared.module';
import { MatRippleModule } from '@angular/material';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { DashboardService } from './dashboard.service';
import { TopbarComponent } from './componentes/topbar/topbar.component';

@NgModule({
	declarations: [
		DashboardComponent,
		SidenavComponent,
		TopbarComponent,
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		SharedModule,
		MatRippleModule
	],
	providers: [
		DashboardService
	]
})
export class DashboardModule { }
