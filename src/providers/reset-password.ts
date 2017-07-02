import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../model/user.model';
import { Base } from './base';

@Injectable()
export class PasswordReset extends Base {

  constructor(public http: Http) {
    super();
  }

  email(user: User) {
    return this.http.post(this.urlApi + "password/email", this.jsonToQueryString(user), {headers: this.headers})
               .timeout(10000)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  verifyToken(user: User) {
    return this.http.post(this.urlApi + "password/verify-token/" + user.token, this.jsonToQueryString(user), {headers: this.headers})
               .timeout(10000)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  reset(user: User) {
    return this.http.post(this.urlApi + "password/reset/" + user.token, this.jsonToQueryString(user), {headers: this.headers})
               .timeout(10000)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

}
