import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService, HttpService } from '@app/core';
import { FocusNextDirective } from '@app/shared';
import { environment } from '@env';

@Component({
  selector: 'tr-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  path: string[];
  usuario: any = {
    iduser: 0,
    nombuser: '',
    contuser: '',
    contuseN: '',
    tipouser: 0,
    path: '',
  }
  imagen = null;
  @ViewChildren(FocusNextDirective) focusElements: QueryList<FocusNextDirective>;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private utilService: UtilService
  ) { }

  ngOnInit() {
    this.path = this.router.url.split('/').splice(1);
    this.httpService.get('usuario/me').then((data) => {
      if (data.err === 0) {
        this.usuario = data.user;
        this.usuario.path = environment.usuariosUrl + this.usuario.path;
      } else {
        this.utilService.notification(data.msg);
      }
    })
  }
  clickImagen(imagenInput) {
    if (this.imagen === null) {
      imagenInput.click();
    } else {
      if (this.imagen != environment.usuariosUrl + 'nouser.png')
        this.imagen = environment.usuariosUrl + 'nouser.png';
    }
  }
  cargaImagen(ev) {
    this.utilService.leeArchivo(ev.target, 'dataurl', () => {
      this.utilService.notification('Error al cargar la imagen');
    }).then(result => {
      this.imagen = result;
    });
  }

}
