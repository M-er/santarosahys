import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';
import { DialogoProducto } from './productos.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [ProductosComponent, DialogoProducto],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule
  ],
  entryComponents:[
    DialogoProducto
  ]
})
export class ProductosModule { }
