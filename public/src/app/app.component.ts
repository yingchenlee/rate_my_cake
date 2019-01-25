import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newCake: any; // this is for creating a new cake
  allCakes: any; // retrieve all the cakes and pass it to the front end
  showCakes: Boolean = false;
  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    this.getAllCakes();
    this.newCake = {name: '', imgurl: ''};
    // this.updateCake = {name: '', imgurl: ''};
  }
  addNewcake() {
    this._httpService.addCake(this.newCake).subscribe( data => {
      console.log('added a cake!', data);
      this.newCake = {baker_name: '', img_url: '' }; // set the form back to blank instead of keeping the values there
      this.getAllCakes();
    });
  }
  getAllCakes() {
    this._httpService.getCakes().subscribe( cakes => {
      console.log('got all the cakes!: ', cakes);
      this.allCakes = cakes;
      this.showCakes = true;
    });
  }
  addNewReview(rvFormData, id) {
    let formObject = {
      rate: rvFormData['rate'],
      cmt: rvFormData['cmt'],
      };
    console.log("id", id);
    this._httpService.addReview(formObject, id).subscribe( data => {
      console.log('added a review!');
      console.log(rvFormData);
      // rvFormData.Reset();
    });
  }
}
