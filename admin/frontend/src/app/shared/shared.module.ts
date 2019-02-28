import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '@tres-erres/ngx-utils';
import { ChartModule } from 'angular-highcharts';

/* Material Modules */
import {
	MatButtonModule,
	MatInputModule,
	MatCardModule,
	MatChipsModule,
	MatProgressSpinnerModule,
	MatExpansionModule,
	MatTooltipModule,
	MatSnackBarModule,
	MatSlideToggleModule,
	MatDialogModule,
	MatToolbarModule,
	MatIconModule,
	MatCheckboxModule,
	MatSelectModule,
	MatTableModule,
	MatFormFieldModule,
	MatRadioModule,
	MatSidenavModule,
	MatListModule,
	MatMenuModule
} from '@angular/material';
/** Dialogs */
import {
	LoginDialog,
} from '@app/shared/dialogs';
/** Modules */
/** Directives */
import { FocusNextDirective } from './focus-next.directive';
import { HttpService } from '@app/core';
import { ComponentesModule, HttpService as ComponentesHttpService } from '@componentes/.';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		/* Custom Modules */
		ComponentesModule,
		/* Material Modules */
		MatFormFieldModule,
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatChipsModule,
		MatProgressSpinnerModule,
		MatExpansionModule,
		MatTooltipModule,
		MatSnackBarModule,
		MatSlideToggleModule,
		MatDialogModule,
		MatToolbarModule,
		MatIconModule,
		MatCheckboxModule,
		MatSelectModule,
		MatTableModule,
		MatRadioModule,
		MatSidenavModule,
		MatListModule,
		MatMenuModule,
		UtilsModule,
		/** HighCharts */
		ChartModule
	],
	declarations: [
		/* Directives */
		FocusNextDirective,
		/** Dialogs */
		LoginDialog,
		BreadcrumbsComponent,
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		/* Custom Modules */
		ComponentesModule,
		UtilsModule,
		/* Material Modules */
		MatFormFieldModule,
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatChipsModule,
		MatProgressSpinnerModule,
		MatExpansionModule,
		MatTooltipModule,
		MatSnackBarModule,
		MatSlideToggleModule,
		MatDialogModule,
		MatToolbarModule,
		MatIconModule,
		MatCheckboxModule,
		MatSelectModule,
		MatTableModule,
		MatRadioModule,
		MatSidenavModule,
		MatListModule,
		MatMenuModule,
		/** HighCharts */
		ChartModule,
		/** Directives */
		FocusNextDirective,
		/** Dialogs */
		LoginDialog,
		/** BreadCrumbs */
		BreadcrumbsComponent,

	],
	entryComponents: [
		/** Dialogs */
		LoginDialog,
	],
	providers: [
		{ provide: ComponentesHttpService, useClass: HttpService }
	]
})
export class SharedModule { }
