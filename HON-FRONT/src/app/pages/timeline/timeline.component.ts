import { Component, OnInit , Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Util } from '../../core/util';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { RutasApiConfig } from '../../core/rutasapi.config';
import { ConstantesConfig } from '../../core/constantes.config';
import { TareaModalComponent } from './tarea_modal.component';

@Component({
  selector: 'timeline-gantt',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent implements OnInit{
  private nombreProject: string;
  private idProj: any;
  bsModalRef: BsModalRef;

  constructor(private _util: Util,  private modalService: BsModalService, 
    private route: ActivatedRoute){}

  ngOnInit(){
    this.idProj = +this.route.snapshot.paramMap.get('id');
    this.loadProjectTimeline();
  }

  private addTarea(): void{
    this.bsModalRef = this.modalService.show(TareaModalComponent);
    this.bsModalRef.content.title = 'Create Task';
    this.bsModalRef.content.idProj = this.idProj;
  }

  private loadProjectTimeline():void{
    let url = RutasApiConfig.FBYID_PROJECT;
    let dto = { id: this.idProj };
    this._util.http({url: url, data: dto}).subscribe(
      data=>{
        this._util.log(data);
        this.nombreProject = data.nombre;
      },
      error=>{
        this._util.log(error);
      }
    )}
}