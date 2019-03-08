import { Component, OnInit, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { UtilService, HttpService } from '@app/core';
import { Router } from '@angular/router';
import { FocusNextDirective } from '@app/shared';
@Component({
	selector: 'tr-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

	constructor(
		private router: Router,
		private httpService: HttpService,
		private utilService: UtilService
	) { }

	user = '';
	password = '';
	@ViewChildren(FocusNextDirective) focusElements: QueryList<FocusNextDirective>;

	ngOnInit() {
		/* Request para verificar login */
		this.httpService.get('session/').then((data) => {
			if (data.err === 0) {
				this.utilService.setLS('logged', true);
				this.router.navigate(['/']);
			} else {
				this.utilService.setLS('logged', false);
			}
		});
	}
	olvide(){
		this.utilService.notification("Por favor, comunicarse con el administrador del sitio.")
	}
	reset() {
		this.user = '';
		this.password = '';
	}

	login() {
		this.httpService.post('login/', { 'user': this.user, 'password': this.password }).then((data) => {
			if(data.err===0){
				this.utilService.setLS('logged', true);
				this.router.navigate(['inicio']);
			}else{
				this.utilService.notification(data.msg);
			}
			
		});
	}

}
