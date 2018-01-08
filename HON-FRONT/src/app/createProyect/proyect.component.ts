import { Component, OnInit , Injectable} from '@angular/core';
import { Util } from '../core/util';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import { DtoProyecto } from '../dto/dtoProyecto'
import { error } from 'selenium-webdriver';
import { Subscriber } from 'rxjs/Subscriber';

import { RutasApiConfig } from '../core/rutasapi.config';
import { ConstantesConfig } from '../core/constantes.config';
import { AppComponent } from '../app.component';

@Component({
  selector: 'create-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.less']
})

@Injectable()
export class ProyectComponent implements OnInit{
  private proyectos:DtoProyecto[] = [];
  
  constructor( private _util: Util){
    
  }
    ngOnInit(){
      this.loadProjects();
    }

    private loadProjects():void{
      let url = RutasApiConfig.ALL_PROJECTS;
      let dto = { estado: ConstantesConfig.ESTADO_OK }
      this._util.http({url: url, data: dto}).subscribe(
        data=>{
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            let proj = new DtoProyecto(data[i].id,data[i].nombre);
            this.proyectos.push(proj);
          }
        },
        error=>{
          console.log(error);
        }
      );
    }

    private delete(identificador: number): void {
      console.log(identificador);
      let url = RutasApiConfig.D_PROJECT;
      let dto = { id: identificador}
      this._util.http({url: url, data: dto}).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
      // .subscribe(
      //   data =>{
      //     console.log(data);
      //   },
      //   error =>{
      //     console.log(error);
      //   }
      // )
    }
}
