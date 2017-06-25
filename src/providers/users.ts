import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Base } from './base';

@Injectable()
export class Users extends Base {

  constructor(public http: Http) {
    super();
  }

  getUser() {
    return this.http.get(this.urlApi + "users/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGNhcGkuaG9sLmVzL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNDk4MzUxMzEwLCJleHAiOjE1MDA5NzkzMTAsIm5iZiI6MTQ5ODM1MTMxMCwianRpIjoiMHoxNlN1YVhEaGVTNEluSiIsInN1YiI6MX0.iYvIWgZLhoINiYx7HXHDiYZzdVUonbxMUqWnqEeW62I" /*+ localStorage.getItem("token")*/)
               .timeout(10000)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }

}
