import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

@Injectable()
export class Simulation extends Base {

  constructor(public http: Http) {
    super();
  }

  getProofs() {
    return this.http.get(this.urlApi + "simulations/proofs", {headers: this.headers})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

}
