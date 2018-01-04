import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ServerParamHttp } from './serverParamHttp';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class Util {
    constructor(private _http:Http) {
    }
    /**
	 * Funcion que retorna la url del sistema
	 */
    protected confUrl: ServerParamHttp;
    public getUrl(confUrl: ServerParamHttp|{} = {})
    {
        this.confUrl = new ServerParamHttp(this._http, confUrl);
        return this.confUrl.validRootApp;
    }

    /**
	 * Funciones para las llamadas GET sin datos
	 */
    protected conf: ServerParamHttp;
    public http(conf: ServerParamHttp|{} = {}) 
    {
        //this._spinner.showIn();
        this.conf = new ServerParamHttp(this._http, conf);
        return this.conf.http()
            .map(res => {
                return this.extractData(res, this.conf.tipo);
            })
    }

    

    /**
	 * Funciones Transformadores de respuestas REST
	 */
    private extractData(res: Response, tipo: string) {
        if (res.text().length > 0) {
            let body;
            body = this.getTipoData(res, tipo);
            return body || { };
        }
        else return {};
    }

    private getTipoData(res, tipo) {
        let rpta: any;
        switch (tipo) {
            case 'BLOB':
                rpta = res.blob();
                break;
            case 'JSON':
                rpta = res.json();
                break;
            default:
                rpta = res.text();
                break;
        }
        return rpta;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        let err: string;
        if(error.status == 401) { console.log("(MK)HandleError"); }
        if (error instanceof Response) {
          const body = error.json() || '';
          err = body.error || JSON.stringify(body);
          errMsg = `Estado: ${error.status}, Descripción: ${error.statusText || ''} , Error: ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(JSON.parse(error._body));
    }

    public clone(object: any){
        return JSON.parse(JSON.stringify(object));
    }

    private log(cad:any)
    {
        console.log(cad);
    }

    /**
	 * Funciones para la Conexión del las llamadas REST
	 */

    private paramMostrar = new Subject<any>();
    paramMostrar$ = this.paramMostrar.asObservable();
    public setParamMostrar(paramMostrar: any) {
        this.log("util-paramsMO:" + paramMostrar);
        this.paramMostrar.next(paramMostrar);
    }

    private paramGenerar = new Subject<any>();
    paramGenerar$ = this.paramGenerar.asObservable();
    public setParamGenerar(paramGenerar: any) {
        this.log("util-paramsGE:" + paramGenerar);
        this.paramGenerar.next(paramGenerar);
    }

    private paramActualizar = new Subject<any>();
    paramActualizar$ = this.paramActualizar.asObservable();
    public setParamActualizar(paramActualizar: any) {
        this.log("util-paramsAC:" + paramActualizar);
        this.paramActualizar.next(paramActualizar);
    }

    private paramAnular = new Subject<any>();
    paramAnular$ = this.paramAnular.asObservable();
    public setParamAnular(paramAnular: any) {
        this.log("util-paramsAN:" + paramAnular);
        this.paramAnular.next(paramAnular);
    }

    private paramAsignar = new Subject<any>();
    paramAsignar$ = this.paramAsignar.asObservable();
    public setParamAsignar(paramAsignar: any) {
        this.paramAsignar.next(paramAsignar);
    }
}