import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.guard';

/*[
	{ path: '', pathMatch: 'full', redirectTo: '/home' },
	{ path: 'home', component: HomeComponent }
]*/

const routes: Routes = [
	{
		path: '',
		canActivate: [AuthGuard],
		loadChildren: 'app/layout/dashboard/dashboard.module#DashboardModule'
	},
	{
		path: 'auth',
		loadChildren: 'app/layout/auth/auth.module#AuthModule'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
