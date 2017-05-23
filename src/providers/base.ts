import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class Base {

	protected headers = new Headers();

  protected urlApi: string = 'http://bioquiz-api.com/api/';

  constructor() {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  protected handleError(error: any): Promise<any> {
    return Promise.reject(error);
  }

  protected jsonToQueryString(json) {
    return '' +
      Object.keys(json).map(function(key) {
          return encodeURIComponent(key) + '=' +
              encodeURIComponent(json[key]);
      }).join('&');
  }

}