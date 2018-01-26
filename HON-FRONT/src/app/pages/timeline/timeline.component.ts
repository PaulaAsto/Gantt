import { Component, OnInit , Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Util } from '../../core/util';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ColorPickerModule } from 'ngx-color-picker';

import { DtoTarea } from '../../dto/dtotarea';

import { RutasApiConfig } from '../../core/rutasapi.config';
import { ConstantesConfig } from '../../core/constantes.config';
import { TareaModalComponent } from './tarea_modal.component';
import { ActividadModalComponent } from './actividad_modal.component';
import { error } from 'util';
import { DtoActividad } from '../../dto/dtoactividad';
import { FuncionesConfig } from '../../core/funciones.config';

declare var swal: any;

@Component({
  selector: 'timeline-gantt',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent implements OnInit{
  private nombreProject: string;
  private idProj: number;
  bsModalRef: BsModalRef;
  tasks:DtoTarea[];
  private actividades:DtoActividad[];
  public color: string = '#ffa500';
  
  status: any = {
    isFirstOpen: false,
    isFirstDisabled: true
  };
  
  constructor(private _util: Util,  private modalService: BsModalService, 
    private route: ActivatedRoute, private funcionesConfig: FuncionesConfig){}
    
    ngOnInit(){
      this.idProj = +this.route.snapshot.paramMap.get('id');
      this.loadProjectTimeline();
    }
    
    private onChangeColor(color: string, idTask: number): void{
      let url = RutasApiConfig.U_COLOR_TASK;
      let dto = {id : idTask,
      color: color}
      this._util.http({url: url, data: dto}).subscribe(
        data => {
          this._util.log(data);
        },
        error => {
          this._util.log(error);
        }
      )
      
    }
    private onChangeColorAct(color: string, idActividad: number): void{
      let url = RutasApiConfig.U_COLOR_ACTIVITY;
      let dto = {id : idActividad,
      color: color}
      this._util.http({url: url, data: dto}).subscribe(
        data => {
          this._util.log(data);
        },
        error => {
          this._util.log(error);
        }
      )
      
    }

    private addTarea(): void{
      this.bsModalRef = this.modalService.show(TareaModalComponent);
      this.bsModalRef.content.title = 'Create Task';
      this.bsModalRef.content.idProj = this.idProj;
      this.bsModalRef.content.type = 1;
      this.bsModalRef.content.onClose = () => {
        this.loadProjectTimeline();
        this.bsModalRef.hide();
      };
    }
    
    private updateTarea(idTarea: number): void{
      let url = RutasApiConfig.FBYID_TASK;
      let dto= { id: idTarea };
      this._util.http({url: url, data: dto}).subscribe(
        data => {
          this.bsModalRef = this.modalService.show(TareaModalComponent);
          this.bsModalRef.content.title = 'Update Task';
          this.bsModalRef.content.idTarea = idTarea;
          this.bsModalRef.content.nombre = data.nombre;
          this.bsModalRef.content.descripcion = data.descripcion;
          this.bsModalRef.content.type = 2;
          this.bsModalRef.content.onClose = () => {
            this.loadProjectTimeline();
            this.bsModalRef.hide();
          };
        },
        error =>{
          this._util.log(error);
        }
      )
    }
    
    private createActivity(idTarea: number): void{
      this.bsModalRef = this.modalService.show(ActividadModalComponent);
      this.bsModalRef.content.title = 'Create Activity';
      this.bsModalRef.content.idTask = idTarea;
      this.bsModalRef.content.type = 1;
      this.bsModalRef.content.onClose = () => {
        this.loadProjectTimeline();
        this.bsModalRef.hide();
      };
    }
    
    public loadActivities(task: number):void{
      this.actividades = [];
      let url = RutasApiConfig.ALL_ACTIVITIES;
      let dto = { idTarea: task}
      this._util.http({url: url, data: dto}).subscribe(
        data=>{
          this._util.log(data);
          for (let i = 0; i < data.length; i++) {
            let dias = this.funcionesConfig.diferenciaEntreDiasEnDias(new Date(data[i].fechaInicio), new Date(data[i].fechaFin));
            let act = new DtoActividad(data[i].id,data[i].nombre, new Date(data[i].fechaInicio), new Date(data[i].fechaFin), dias);
            this.actividades.push(act);
          }
        },
        error=>{
          this._util.log(error);
        }
      );
    }
    
    private updateActivity(idActividad: number, idTarea: number): void{
      let url = RutasApiConfig.FWITHFECHASBYID_ACTIVITY;
      let dto= { id: idActividad };
      this._util.http({url: url, data: dto}).subscribe(
        data => {
          this.bsModalRef = this.modalService.show(ActividadModalComponent);
          this.bsModalRef.content.title = 'Update Activity';
          this.bsModalRef.content.idTask = idTarea;
          this.bsModalRef.content.idActividad = idActividad;
          this.bsModalRef.content.nombre = data.nombre;
          this.bsModalRef.content.descripcion = data.descripcion;
          this.bsModalRef.content.type = 2;
          this.bsModalRef.content.onClose = () => {
            this.loadProjectTimeline();
            this.bsModalRef.hide();
          };
        },
        error =>{
          this._util.log(error);
        })
        
      }
      
      private deleteAct(idActividad: number, idTask: number): void{
        let self = this;
        swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!'
        }).then(function () {
          self.deleteActividad(idActividad, idTask);
        }, function (dismiss) {
          if (dismiss === 'cancel') {
            swal(
              'Cancelled',
              'Your activity is safe :)',
              'error'
            )                
          }
        }) 
      }
      
      private deleteActividad(idActividad: number, idTask: number): void{
        let url = RutasApiConfig.D_ACTIVITY;
        let urlTask = RutasApiConfig.DAYS_MIN_MAX_TASK;
        let urlUpdateTask = RutasApiConfig.U_FECHA_TASK;
        let dto = { id: idActividad };
        let dtoTarea = { idTarea : idTask};
        let fechaIniTask:Date;
        let fechaFinTask:Date;
        this._util.http({url: url, data: dto}).subscribe(
          data => {
            this._util.http({url: urlTask, data: dtoTarea}).subscribe(
              data => {
                this._util.log(data);
                fechaIniTask = new Date(data[ConstantesConfig.ELEMENTO_PRIMERO]);
                fechaFinTask = new Date(data[ConstantesConfig.ELEMENTO_SEGUNDO]);
                let dtoTarea = {
                  id:  idTask,
                  fechaInicio: fechaIniTask,
                  fechaFin: fechaFinTask
                }
                this._util.http({url: urlUpdateTask, data: dtoTarea}).subscribe(
                  data =>{
                    this._util.log(data);
                  },
                  error => {
                    this._util.log("error updatetask");
                    this._util.log(error);
                  }
                )
              },
              error =>{
                this._util.log(error);
              })
              swal(
                'Deleted!',
                'Your activity has been deleted.',
                'success'
              )
              this.loadProjectTimeline();
            },
            error => {
              swal(
                'Error',
                'Your activity can not be deleted',
                'error'
              ) 
              this._util.log(error);
            })
          }
          
          private delete(idTarea: number): void { 
            let self = this;
            swal({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!',
              cancelButtonText: 'No, cancel!'
            }).then(function () {
              self.deleteTarea(idTarea);
            }, function (dismiss) {
              if (dismiss === 'cancel') {
                swal(
                  'Cancelled',
                  'Your task is safe :)',
                  'error'
                )                
              }
            })      
          }
          
          private deleteTarea(idTarea: number): void{
            let url = RutasApiConfig.D_TASK;
            let dto = { id: idTarea };
            this._util.http({url: url, data: dto}).subscribe(
              data => {
                swal(
                  'Deleted!',
                  'Your task has been deleted.',
                  'success'
                )
                this.loadProjectTimeline();
              },
              error => {
                swal(
                  'Error',
                  'Your project can not be deleted',
                  'error'
                ) 
                this._util.log(error);
              })
            }
            
            private loadProjectTimeline():void{
              let url = RutasApiConfig.FBYID_PROJECT;
              let urlTask = RutasApiConfig.ALL_TASKS;
              let dto = { id: this.idProj };
              let dtoTask = { idProyecto: this.idProj, estado: 1 };
              this._util.http({url: url, data: dto}).subscribe(
                data=>{
                  this._util.log(data);
                  this.tasks = [];
                  this.nombreProject = data.nombre;
                  this._util.http({url: urlTask, data: dtoTask}).subscribe(
                    data => {
                      for (let i = 0; i < data.length; i++) {
                        let dias = this.funcionesConfig.diferenciaEntreDiasEnDias(new Date(data[i].fechaInicio), new Date(data[i].fechaFin));
                        let tarea = new DtoTarea(data[i].id,data[i].nombre,'', new Date(data[i].fechaInicio), new Date(data[i].fechaFin), dias, data[i].color);
                        this.tasks.push(tarea);
                      }
                    },
                    error =>{
                      this._util.log(error);
                    }
                  )
                },
                error=>{
                  this._util.log(error);
                }
              )
            }
            
          }
          
          