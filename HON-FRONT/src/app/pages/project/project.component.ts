import { Component, OnInit , Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { Util } from '../../core/util';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DtoProyecto } from '../../dto/dtoproyecto';

import { error } from 'util';
import { RutasApiConfig } from '../../core/rutasapi.config';
import { ConstantesConfig } from '../../core/constantes.config';
import { AppComponent } from '../../app.component';
import { ProjectModalComponent } from './project_modal.component';

declare var swal: any;

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})

@Injectable()
export class ProyectComponent implements OnInit{
  private proyectos:DtoProyecto[];
  bsModalRef: BsModalRef;
  
  constructor( private _util: Util, private modalService: BsModalService, private router: Router){}
  
  
  ngOnInit(){
    this.loadProjects();
  }
  
  public loadProjects():void{
    this.proyectos = [];
    let url = RutasApiConfig.ALL_PROJECTS;
    let dto = { estado: ConstantesConfig.ESTADO_OK }
    this._util.http({url: url, data: dto}).subscribe(
      data=>{
        this._util.log(data);
        for (let i = 0; i < data.length; i++) {
          let proj = new DtoProyecto(data[i].id,data[i].nombre);
          this.proyectos.push(proj);
        }
      },
      error=>{
        this._util.log(error);
      }
    );
  }
  
  private delete(identificador: number): void {
    this._util.log(identificador);
    let url = RutasApiConfig.D_PROJECT;
    let dto = { id: identificador}
    this._util.http({url: url, data: dto}).subscribe(
      data => {
        this.loadProjects();
      },
      error => {
        this._util.log(error);
      }
    )
  }
  
  private update(identificador:number, name:string): void{
    this.bsModalRef = this.modalService.show(ProjectModalComponent);
    this.bsModalRef.content.title = 'Update Project';
    this.bsModalRef.content.id = identificador;
    this.bsModalRef.content.name = name;
  }
  
  private crear(nombreProjectNew: string): void{
    let url = RutasApiConfig.C_PROJECT;
    let url2 = RutasApiConfig.FBYNOMBRE_PROJECT;
    let dto = { nombre: nombreProjectNew }
    this._util.http({url: url2, data: dto}).subscribe(
      data => {
        if(data.id == null){
          this._util.http({url: url, data: dto}).subscribe(
            data=>{
              this._util.http({url: url2, data: dto}).subscribe(
                data => {
                  let id = data.id;
                  this.router.navigate(['project/timeline/' + id]);
                },
                error => {
                  this._util.log(error);
                }
              )
            },
            error=>{
              this._util.log(error);
            }
          );
        }
        else{
          swal('Oops...', 'Ya existe un proyecto con ese nombre!', 'error')
        }
      },
      error =>{
        this._util.log(error);
      }
      
    );
    
  }
}
