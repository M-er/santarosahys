import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { DialogoUsuario } from './usuarios.component';

import { SharedModule } from '@app/shared/shared.module';
@NgModule({
  declarations: [UsuariosComponent, DialogoUsuario],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ],
  entryComponents: [DialogoUsuario]
})
export class UsuariosModule { }
