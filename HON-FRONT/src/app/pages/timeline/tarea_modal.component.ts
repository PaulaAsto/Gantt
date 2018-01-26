import { Component , Injectable} from '@angular/core';
import { Util } from '../../core/util';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DtoTarea } from '../../dto/dtotarea';

import { RutasApiConfig } from '../../core/rutasapi.config';
import { ConstantesConfig } from '../../core/constantes.config';
import { AppComponent } from '../../app.component';

declare var swal: any;

@Component({
  selector: 'tarea-modal',
  templateUrl: './tarea_modal.component.html',
  styleUrls: ['./timeline.component.less']
})
@Injectable()
export class TareaModalComponent {
  title: string;
  idProj: number;
  idTarea: number;
  nombre: string;
  descripcion: string;
  type: number;
  tarea: DtoTarea = new DtoTarea(0,'','',new Date(),new Date(), 0, '');
  onClose: any;
  
  constructor(public bsModalRef: BsModalRef, private _util: Util) {}
  
  private accionTarea(taskName: string, taskDescripcion: string): void{
    if(this.type == 1){
      this.cTarea(taskName, taskDescripcion);
    }
    if(this.type == 2){
      this.uTarea(taskName, taskDescripcion);
    }
  }

  private uTarea(taskName: string, taskDescripcion: string): void{
    let url = RutasApiConfig.U_TASK;
    let dto = { id: this.idTarea, nombre: taskName, descripcion: taskDescripcion }
    this._util.http({url: url, data: dto}).subscribe(
      data=>{
        this._util.log(data);
        swal(
          'Updated!',
          'Your task has been updated.',
          'success'
        )
        this.onClose();
      },
      error=>{
        this._util.log(error);
      }
    );
  }
  
  private cTarea(taskName: string, taskDescripcion: string):void{
    let url = RutasApiConfig.C_TASK;
    let dto = { idProyecto: this.idProj, nombre: taskName, descripcion: taskDescripcion }
    this._util.http({url: url, data: dto}).subscribe(
      data=>{
        this._util.log(data);
        swal(
          'Created!',
          'Your task has been created.',
          'success'
        )
        this.onClose();
      },
      error=>{
        this._util.log(error);
      }
    );
  }
}