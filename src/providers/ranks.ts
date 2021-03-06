import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

@Injectable()
export class Ranks extends Base {

  constructor(public http: Http) {
    super();
  }

  getPositioning() {
    return this.http.get(this.urlApi + "rank/positioning", {headers: this.headers})
               .timeout(10000)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  getMyPositioning(idUser) {
    return this.http.get(this.urlApi + "rank/positioning/" + idUser, {headers: this.headers})
               .timeout(10000)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

}
