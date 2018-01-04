import { Http, Headers, Response, RequestOptions, ResponseContentType} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AppConfig } from '../app.config';

export class ServerParamHttp {
  url: string;
  data: string;
  rest: string;
  tipo: string;
  root: boolean;
  json: boolean;

  constructor(protected _http: Http, {url = '', data = '', rest = 'POST', tipo = 'JSON', root = false, json = true}) {
    this.data = data ? data : '';
    this.rest = rest ? rest : 'POST';
    this.tipo = tipo ? tipo : 'JSON';
    this.url = url ? url : '';
    this.root = root ? root : false;
    this.json = json;
  }

  private getDatos(){
    if(this.json){
        return JSON.stringify(this.data);
    }
    else {
        return this.data;
    }
  }

  validRootApp(){
   return Observable.of(Response).map(res => this.url);
}

  private restCall() {
      let rpta:Observable<any>;
      this.log(this.url);
      let headers = this.getHeaders();
      let datos = this.getDatos();
      switch (this.rest) {
        case 'GET':
            this.log("(MK)Rest-Get");
            rpta = this._http.get(this.url);
            break;
        case 'DELETE':
            this.log("(MK)Rest-delete: " + datos);
            rpta = this._http.delete(this.url, { headers: headers }); 
            break;
        case 'UPDATE':
            this.log("(MK)Rest-Update: " + datos);
            rpta = this._http.put(this.url, datos, { headers: headers }); 
            break;
        default:
            this.log("(MK)Rest-Post: " + datos);
            rpta = this._http.post(this.url, datos, { headers: headers }); 
            break;
      }
    return rpta;
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  http():Observable<any>{
    this.url = AppConfig.IP_ROUTE + this.url;
    return this.restCall();
   }
   private log(cad:any)
  {
      console.log(cad);
  }
}