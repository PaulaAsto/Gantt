import { Component, OnInit , Injectable} from '@angular/core';
import { Util } from '../../core/util';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { RutasApiConfig } from '../../core/rutasapi.config';
import { ConstantesConfig } from '../../core/constantes.config';
import { ProyectComponent } from './project.component';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'modal-content',
  templateUrl: './project_modal.component.html',
  styleUrls: ['./project.component.less']
})
@Injectable()
export class ProjectModalComponent {
  title: string;
  name: string;
  id: number;
  
  constructor(public bsModalRef: BsModalRef, private _util: Util) {}
  
  updateName(nombreChange: string): void{
    let url = RutasApiConfig.U_PROJECT;
    let dto = { id: this.id, nombre: nombreChange }
    this._util.http({url: url, data: dto}).subscribe(
      data=>{
        this._util.log(data);
        this.bsModalRef.hide();
      },
      error=>{
        this._util.log(error);
      }
    );
  }
}