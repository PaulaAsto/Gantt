import { Component, OnInit , Injectable} from '@angular/core';
import { Util } from '../../core/util';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { RutasApiConfig } from '../../core/rutasapi.config';
import { ConstantesConfig } from '../../core/constantes.config';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'tarea-modal',
  templateUrl: './tarea_modal.component.html',
  styleUrls: ['./timeline.component.less']
})
@Injectable()
export class TareaModalComponent {
  title: string;
  idProj: number;

  constructor(public bsModalRef: BsModalRef, private _util: Util) {}
}