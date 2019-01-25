import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  addCake(x) {
    console.log(x);
    return this._http.post('/create', x);
  }

  getCakes() {
    return this._http.get('/listall');
  }
  addReview(formobject, id) {
    console.log("going to route for", id)
    return this._http.post('/review/' + id, formobject);
  }
}
