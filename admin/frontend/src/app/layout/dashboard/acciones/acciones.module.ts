import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccionesRoutingModule } from './acciones-routing.module';
import { AccionesComponent } from './acciones.component';

import { SharedModule } from '@app/shared/shared.module';
@NgModule({
  declarations: [ AccionesComponent ],
  imports: [
    CommonModule,
    AccionesRoutingModule,

    SharedModule
  ]
})
export class AccionesModule { }
