import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

@Injectable()
export class Users extends Base {

  constructor(public http: Http) {
    super();
  }

  getUser() {
    return this.http.get(this.urlApi + "users/" + localStorage.getItem("token"))
               .timeout(10000)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

}
