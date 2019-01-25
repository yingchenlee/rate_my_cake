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
    console.log('Going to route for', id);
    return this._http.post('/review/' + id, formobject);
  }
  deleteCake(id) {
    return this._http.delete('/cake/' + id);
  }
  updateCake(cake_object) {
    return this._http.put('/update', cake_object);
  }
  showCakeComponent(id) {
    return this._http.get('/cake/' + id);
  }
}
