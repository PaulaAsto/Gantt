import { Component, OnInit , Injectable} from '@angular/core';
import { Util } from '../../core/util';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DtoTarea } from '../../dto/dtotarea';

import { RutasApiConfig } from '../../core/rutasapi.config';
import { ConstantesConfig } from '../../core/constantes.config';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'tarea-modal',
  templateUrl: './tarea_modal.component.html',
  styleUrls: ['./timeline.component.less']
})
@Injectable()
export class TareaModalComponent implements OnInit {
  title: string;
  idProj: number;
  tarea: DtoTarea = new DtoTarea(0,'','');

  constructor(public bsModalRef: BsModalRef, private _util: Util) {}

  ngOnInit(){
    this.loadTarea();
  }

  private cTarea(taskName: string, taskDescripcion: string):void{
    let url = RutasApiConfig.C_TASK;
    let dto = { idProyecto: this.idProj, nombre: taskName, descripcion: taskDescripcion }
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

  private loadTarea(): void{
    let url = RutasApiConfig.FBYID_TASK;
  }
}