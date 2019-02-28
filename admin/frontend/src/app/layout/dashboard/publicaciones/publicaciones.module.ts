import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacionesRoutingModule } from './publicaciones-routing.module';
import { PublicacionesComponent } from './publicaciones.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DialogoNoticia } from './publicaciones.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [PublicacionesComponent,DialogoNoticia],
  imports: [
    CommonModule,
    AngularEditorModule,
    PublicacionesRoutingModule,
    SharedModule
  ],
  entryComponents:[
    DialogoNoticia
  ]
})
export class PublicacionesModule { }
