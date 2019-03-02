import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{
				path: '',
				redirectTo: 'inicio',
				pathMatch: 'full'
			},
			{
				path: 'inicio',
				loadChildren: 'app/layout/dashboard/inicio/inicio.module#InicioModule'
			},

			{
				path: 'acciones', 
				loadChildren: 'app/layout/dashboard/acciones/acciones.module#AccionesModule'
			},
			// {
			// 	path: 'perfil', 
			// 	loadChildren: 'app/layout/dashboard/perfil/perfil.module#PerfilModule'
			// },
			{
				path: 'usuarios', 
				loadChildren: 'app/layout/dashboard/usuarios/usuarios.module#UsuariosModule'
			},
			{
				path: 'institucional', 
				loadChildren: 'app/layout/dashboard/institucional/institucional.module#InstitucionalModule'
			},
			{
				path: 'productos', 
				loadChildren: 'app/layout/dashboard/productos/productos.module#ProductosModule'
			},
			{
				path: 'servicios', 
				loadChildren: 'app/layout/dashboard/servicios/servicios.module#ServiciosModule'
			},
			{
				path: 'cursos', 
				loadChildren: 'app/layout/dashboard/cursos/cursos.module#CursosModule'
			},
			{
				path: 'publicaciones', 
				loadChildren: 'app/layout/dashboard/publicaciones/publicaciones.module#PublicacionesModule'
			}


		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule { }
