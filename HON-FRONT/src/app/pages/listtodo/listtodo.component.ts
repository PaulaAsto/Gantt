import { Component, OnInit , Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Util } from '../../core/util';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DtoEstadoGant } from '../../dto/dtoestadogant';

import { RutasApiConfig } from '../../core/rutasapi.config';
import { ConstantesConfig } from '../../core/constantes.config';
import { error } from 'selenium-webdriver';
import { MiniModalComponent } from './mini-modal.component';
import { DtoMini } from '../../dto/dtomini';

declare var swal: any;

@Component({
  selector: 'list-todo',
  templateUrl: './listtodo.component.html',
  styleUrls: ['./listtodo.component.less']
  
})
export class ListToDoComponent implements OnInit{
  
  private idActividad: number;
  private nombreAct: string;
  private listEstadoGant: DtoEstadoGant[] = [];
  bsModalRef: BsModalRef;
  
  constructor(private _util: Util, private modalService: BsModalService, private route: ActivatedRoute){}
  
  ngOnInit(){
    this.idActividad = +this.route.snapshot.paramMap.get('idActivity');
    this.loadListToDo();
    this.loadEstadoGant();
  }
  
  onItemDrop(e: any, idEstado: number) {
    this.updateEstadoMini(idEstado, e.dragData.id);
    this.loadEstadoGant();
  }
  
  private updateEstadoMini(idEstado: number, idMini: number): void{
    let url = RutasApiConfig.U_ESTADO_MINIACTIVITY;
    let dto = {
      id : idMini, 
      idEstado: idEstado
    };
    this._util.http({url: url, data: dto}).subscribe(
      data =>{
        this._util.log(data);
      },
      error=>{
        this._util.log(error);
      }
    )
  }
  
  private delete(idMini: number): void { 
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
      self.trashMini(idMini);
    }, function (dismiss) {
      if (dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your mini activity is safe :)',
          'error'
        )                
      }
    })      
  }
  
  private trashMini(idMini: number): void{
    let url = RutasApiConfig.D_MINIACTIVITY;
    let dto = {id : idMini};
    this._util.http({url: url, data: dto}).subscribe(
      data => {
        swal(
          'Deleted!',
          'Your mini activity has been deleted.',
          'success'
        )
        this.loadEstadoGant();
      },
      error => {
        swal(
          'Error',
          'Your mini activity can not be deleted',
          'error'
        ) 
        this._util.log(error);
      }
    )
  }
  private addMini(): void{
    this.bsModalRef = this.modalService.show(MiniModalComponent);
    this.bsModalRef.content.title = 'Create Mini Actividad';
    this.bsModalRef.content.idActividad = this.idActividad;
    this.bsModalRef.content.onClose = () => {
      this.loadEstadoGant();
      this.bsModalRef.hide();
    };
  }
  
  private loadListToDo():void{
    let url = RutasApiConfig.FBYID_ACTIVITY;
    let dto = { id: this.idActividad };
    this._util.http({url: url, data: dto}).subscribe(
      data=>{
        this._util.log(data);
        this.nombreAct = data.nombre;
      },
      error=>{
        this._util.log(error);
      }
    )
  }
  
  private loadEstadoGant(): void{
    this.listEstadoGant = [];
    let url = RutasApiConfig.ALL_ESTADOGANT;
    let urlAct = RutasApiConfig.ALL_MINIACTIVITY;
    let dto = {};
    this._util.http({url: url, data: dto}).subscribe(
      data => {
        this._util.log(data);
        for (let i = 0; i < data.length; i++) {
          let dtoAct = {
            idActividad : this.idActividad,
            idEstado : data[i].id
          }
          let listMini: DtoMini[] = [];
          this._util.http({url: urlAct, data: dtoAct}).subscribe(
            dataAct => {
              this._util.log(dataAct);
              for (let i = 0; i < dataAct.length; i++) {
                let min = new DtoMini(dataAct[i].id,dataAct[i].nombre);
                listMini.push(min);
              }
              let est = new DtoEstadoGant(data[i].id,data[i].nombre, listMini);
              this.listEstadoGant.push(est);
            },
            error =>{
              this._util.log(error);
            }
          )
          
        }
      },
      error =>{
        this._util.log(error);
      }
    )
  }
}