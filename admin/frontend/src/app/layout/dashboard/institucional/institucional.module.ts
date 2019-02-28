import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitucionalRoutingModule } from './institucional-routing.module';
import { InstitucionalComponent } from './institucional.component';
import { SharedModule } from '@app/shared/shared.module';
@NgModule({
  declarations: [InstitucionalComponent],
  imports: [
    CommonModule,
    InstitucionalRoutingModule,
    SharedModule
  ]
})
export class InstitucionalModule { }
