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

  getQuestions(id) {
    return this.http.get(this.urlApi + "simulations/questions/" + id, {headers: this.headers})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

  setResult(idUser, idProof, questionsSimulation) {
    console.log(this.jsonToQueryString(questionsSimulation));
    return this.http.post(this.urlApi + "simulations/result/" + idUser + "/" + idProof, this.jsonToQueryString(questionsSimulation), {headers: this.headers})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

}
