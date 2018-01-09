import { Component, OnInit , Injectable} from '@angular/core';
import { Util } from '../../core/util';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import { DtoProyecto } from '../../dto/dtoproyecto'
import { error } from 'selenium-webdriver';
import { Subscriber } from 'rxjs/Subscriber';

import { RutasApiConfig } from '../../core/rutasapi.config';
import { ConstantesConfig } from '../../core/constantes.config';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})

@Injectable()
export class ProyectComponent implements OnInit{
  private proyectos:DtoProyecto[];
  
  constructor( private _util: Util){
    
  }
    ngOnInit(){
      this.loadProjects();
    }

    private loadProjects():void{
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

    private update(): void{
        
    }
}
