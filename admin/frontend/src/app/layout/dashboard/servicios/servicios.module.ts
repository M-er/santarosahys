import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DialogoServicio } from './servicios.component';
import { SharedModule } from '@app/shared/shared.module';
@NgModule({
  declarations: [ServiciosComponent, DialogoServicio],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    AngularEditorModule,
    SharedModule
  ],
  entryComponents: [
    DialogoServicio
  ]
})
export class ServiciosModule { }
