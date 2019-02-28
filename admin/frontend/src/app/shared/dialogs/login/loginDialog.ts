import { Component, Inject, ViewChildren, QueryList } from '@angular/core';
import { HttpService, UtilService } from '@app/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FocusNextDirective } from '@app/shared/focus-next.directive';
import { environment } from '@env';

@Component({
	selector: 'app-login-dialog',
	templateUrl: 'loginDialog.html'
})
export class LoginDialog {

	constructor(
	    public dialogRef: MatDialogRef<LoginDialog>,
	    private httpService: HttpService,
	    private utilService: UtilService,
	    @Inject(MAT_DIALOG_DATA) public data: any
	) { }

	loading = false;
	user = '';
	password = '';

	@ViewChildren(FocusNextDirective) focusElements: QueryList<FocusNextDirective>;

	onSubmit() {
		if (!environment.production) {
			this.dialogRef.close({ 'user': 'Pruebas' });
		}
		if (this.password.length > 0) {
			this.loading = true;
			this.httpService.login(this.user, this.password).subscribe(data => {
				this.loading = false;
				if (data.valid) {
					this.dialogRef.close({'user': data.user, 'nombre': data.nombre, 'razsocial': data.razsocial});
				} else {
					this.utilService.notification('Credenciales incorrectas, intente nuevamente', 'Cerrar', 5);
					this.password = '';
				}
			});
		}
	}

	nextInput(event) {
		if (this.password.length == 0) {
			this.focusElements.find((element) => element.host.name == 'password').focus();
		} else if (this.user.length == 0) {
			this.focusElements.find((element) => element.host.name == 'user').focus();
		} else {
			this.onSubmit();
		}
	}

}
