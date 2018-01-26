import { Component, OnInit , Injectable} from '@angular/core';
import { Util } from '../../core/util';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';

import { RutasApiConfig } from '../../core/rutasapi.config';
import { ConstantesConfig } from '../../core/constantes.config';
import { AppComponent } from '../../app.component';
import { error } from 'util';
import { DtoEstadoGant } from '../../dto/dtoestadogant';

declare var swal: any;

@Component({
  selector: 'mini-modal',
  templateUrl: './mini-modal.component.html',
  styleUrls: ['./listtodo.component.less']
})
@Injectable()
export class MiniModalComponent implements OnInit {
  title: string;
  idActividad: number;
  private listEstadoGant: DtoEstadoGant[] = [];
  onClose: any;
  
  constructor(public bsModalRef: BsModalRef, private _util: Util) {}
  ngOnInit(){
    this.loadEstadoGant();
  }

  createMini(miniName: string, idEst: number): void{
    let url = RutasApiConfig.C_MINIACTIVITY;
    let dto = { 
      idActividad: this.idActividad, 
      idEstado: idEst, 
      nombre: miniName
    }
    this._util.http({url: url, data: dto}).subscribe(
      data=>{
        this._util.log(data);
        this.onClose();
      },
      error=>{
        this._util.log(error);
      }
    );
  }

  private loadEstadoGant(): void{
    let url = RutasApiConfig.ALL_ESTADOGANT;
    let dto = {};
    this._util.http({url: url, data: dto}).subscribe(
      data => {
        this._util.log(data);
        for (let i = 0; i < data.length; i++) {
          let est = new DtoEstadoGant(data[i].id,data[i].nombre, []);
          this.listEstadoGant.push(est);
        }
      },
      error =>{
        this._util.log(error);
      }
    )
  }

  
}