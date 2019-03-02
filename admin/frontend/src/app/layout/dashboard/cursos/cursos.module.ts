import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DialogoCurso } from './cursos.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [CursosComponent, DialogoCurso],
  imports: [
    CommonModule,
    CursosRoutingModule,
    AngularEditorModule,
    SharedModule
  ],
  entryComponents:[
    DialogoCurso
  ]
})
export class CursosModule { }
