import { Component, OnInit , Injectable} from '@angular/core';
import { Util } from '../../core/util';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';

import { RutasApiConfig } from '../../core/rutasapi.config';
import { ConstantesConfig } from '../../core/constantes.config';
import { AppComponent } from '../../app.component';
import { error } from 'util';

declare var swal: any;

@Component({
  selector: 'actividad-modal',
  templateUrl: './actividad_modal.component.html',
  styleUrls: ['./timeline.component.less']
})
@Injectable()
export class ActividadModalComponent {
  title: string;
  idTask: number;
  fechainiAct: Date = new Date();
  fechafinAct: Date = new Date();
  idActividad: number;
  nombre: string;
  descripcion: string;
  type: number;
  onClose: any;
  
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd/mm/yyyy',
    minYear: 2018
  };
  
  
  constructor(public bsModalRef: BsModalRef, private _util: Util) {}
  
  onDateRangeChanged(event: IMyDateRangeModel) {
    this.fechainiAct.setFullYear(event.beginDate.year);
    this.fechainiAct.setMonth(event.beginDate.month);
    this.fechainiAct.setDate(event.beginDate.day);
    this.fechafinAct.setFullYear(event.endDate.year);
    this.fechafinAct.setMonth(event.endDate.month);
    this.fechafinAct.setDate(event.endDate.day);
  }
  
  accionActivity(actiName:string, actiDescripcion: string): void{
    if(this.type == 1) this.createActivity(actiName, actiDescripcion);
    if(this.type == 2) this.updateActivity(actiName, actiDescripcion);
  }

  updateActivity(actiName: string, actiDescripcion: string): void{
    let fechainiTask: Date;
    let fechafinTask: Date;
    let fechainiChange: boolean = false;
    let fechafinChange: boolean = false;
    let urlUpdateTask = RutasApiConfig.U_FECHA_TASK;
    let urlUpdateAct = RutasApiConfig.U_ACTIVITY;
    let dto = { 
      id: this.idActividad, 
      nombre: actiName,
      fechaInicio: this.fechainiAct,
      fechaFin: this.fechafinAct,
      descripcion: actiDescripcion
    }
    //Obtener las fechas de la tarea
    let url = RutasApiConfig.FBYID_TASK;
    let dtoFinIdTask = { id: this.idTask }
    this._util.http({url: url, data: dtoFinIdTask}).subscribe(
      data=>{
        fechainiTask = new Date(data.fechaInicio);
        fechafinTask = new Date(data.fechaFin);
      },
      error=>{
        this._util.log("error getFechaTarea");
        this._util.log(error);
      }
    );
    
    //Actualizar actividad
    this._util.http({url: urlUpdateAct, data: dto}).subscribe(
      data=>{
        this._util.log(data);
        //Si hay cambios en las fechas de tarea
        if(fechainiTask > this.fechainiAct) {
          fechainiTask = this.fechainiAct;
          fechainiChange = true;
        }
        if(fechafinTask < this.fechafinAct){
          fechafinTask = this.fechafinAct;
          fechafinChange = true;
        }
        //Actualiza tarea
        let dtoTarea = {
          id:  this.idTask,
          fechaInicio: fechainiTask,
          fechaFin: fechafinTask
        }
        if(fechainiChange == true || fechafinChange == true){
          this._util.http({url: urlUpdateTask, data: dtoTarea}).subscribe(
            data =>{
              this._util.log(data);
            },
            error => {
              this._util.log("error updatetask");
              this._util.log(error);
            }
          )
        }
        swal(
          'Updated!',
          'Your activity has been updated.',
          'success'
        )
        this.onClose();
      },
      error=>{
        this._util.log("error create actividad");
        this._util.log(error);
      }
    );
  }
  
  createActivity(actiName: string, actiDescripcion: string): void{
    let fechainiTask: Date;
    let fechafinTask: Date;
    let fechainiChange: boolean = false;
    let fechafinChange: boolean = false;
    let urlUpdateTask = RutasApiConfig.U_FECHA_TASK;
    let urlCreateAct = RutasApiConfig.C_ACTIVITY;
    let dto = { 
      idTarea: this.idTask, 
      nombre: actiName,
      fechaInicio: this.fechainiAct,
      fechaFin: this.fechafinAct,
      descripcion: actiDescripcion
    }
    let url = RutasApiConfig.FBYID_TASK;
    let dtoFinIdTask = { id: this.idTask }
    this._util.http({url: url, data: dtoFinIdTask}).subscribe(
      data=>{
        fechainiTask = new Date(data.fechaInicio);
        fechafinTask = new Date(data.fechaFin);
      },
      error=>{
        this._util.log("error getFechaTarea");
        this._util.log(error);
      }
    );
    
    this._util.http({url: urlCreateAct, data: dto}).subscribe(
      data=>{
        this._util.log(data);
        if(fechainiTask > this.fechainiAct) {
          fechainiTask = this.fechainiAct;
          fechainiChange = true;
        }
        if(fechafinTask < this.fechafinAct){
          fechafinTask = this.fechafinAct;
          fechafinChange = true;
        }
        let dtoTarea = {
          id:  this.idTask,
          fechaInicio: fechainiTask,
          fechaFin: fechafinTask
        }
        if(fechainiChange == true || fechafinChange == true){
          this._util.http({url: urlUpdateTask, data: dtoTarea}).subscribe(
            data =>{
              this._util.log(data);
            },
            error => {
              this._util.log("error updatetask");
              this._util.log(error);
            }
          )
        }
        swal(
          'Created!',
          'Your activity has been created.',
          'success'
        )
        this.onClose();
      },
      error=>{
        this._util.log("error update actividad");
        this._util.log(error);
      }
    );
  }
}