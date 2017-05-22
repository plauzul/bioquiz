import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../model/user.model';
import { Base } from './base';

@Injectable()
export class Auth extends Base {

  constructor(public http: Http) {
    super();
  }

  login(user: User) {
    return this.http.post(this.urlApi + "auth/login", this.jsonToQueryString(user), {headers: this.headers})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  register(user: User) {
    return this.http.post(this.urlApi + "auth/register", this.jsonToQueryString(user), {headers: this.headers})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

}
