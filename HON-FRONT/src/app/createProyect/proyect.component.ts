import { Component, OnInit , Injectable} from '@angular/core';
import { Util } from '../core/util';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import { DtoProyecto } from '../dto/dtoProyecto'
import { error } from 'selenium-webdriver';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  selector: 'create-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.less']
})

@Injectable()
export class ProyectComponent implements OnInit{
  private proyectos:DtoProyecto[] = [];
  
  constructor( private _util: Util){
    this.loadProjects();
  }
    ngOnInit(){
      //this.loadProjects();
    }

    private loadProjects(){

      let url = 'rest/apiServices/allProyect';
      let dto = {
        estado: 1
      }
      this._util.http({url: url, data: dto}).subscribe(
        data=>{
          if(data.length != 0)
            console.log("Esto es data: " + data);
          else
            console.log("Esto es data en else: " + data);
        },
        error=>{
          console.log( "Esto es error: " + error)
        }
      );
      /**
       * let url = 'http://localhost:8080/HON/rest/apiServices/allProyect';
      let estado = 1;
      this.httpClient.post(url, {estado: estado})
      .subscribe(
        data =>{
          console.log("Esto es data " + data)
        },
        error => {
          console.log("No se, hay un problema :'v " + error)
        });
       */
    }
}
