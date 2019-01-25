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

  updateCakeForm: Boolean = false;
  theCake: any; // update this

  review: any;
  showDetails: boolean;
  selectedCake: any;
  counter: number;
  sum: number;
  average: number;

  constructor(private _httpService: HttpService) {}

  ngOnInit() {
    this.getAllCakes();
    this.newCake = { name: '', imgurl: '' };
    this.showDetails = false;
    // this.updateCake = { name: "", imgurl: "" };
    // this.updateCake = { name: '', imgurl: ''};
  }
  addNewcake() {
    this._httpService.addCake(this.newCake).subscribe(data => {
      console.log('added a cake!', data);
      this.newCake = {baker_name: '', img_url: '' }; // set the form back to blank instead of keeping the values there
      this.getAllCakes();
    });
  }
  getAllCakes() {
    this._httpService.getCakes().subscribe(cakes => {
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
    console.log('id', id);
    this._httpService.addReview(formObject, id).subscribe( data => {
      console.log('added a review!');
      console.log(rvFormData);
      rvFormData.reset();
    });
  }
  deleteOneCake(id) {
    this._httpService.deleteCake(id).subscribe( data => {
      console.log('deleted a cake!');
      this.getAllCakes();
    });
  }
  showUpdateForm(cake_object) {
    this.updateCakeForm = true; // this will show the form
    this.theCake = cake_object ; // this will pre-populate the form with the existing information
  }
  updateOneCake(cake_object) {
    this._httpService.updateCake(cake_object).subscribe( data => {
      console.log('updated a cake!');
      console.log(cake_object);
      this.updateCakeForm = false;
      this.getAllCakes();
    });
  }
  addReview(formData, id) {
    var formObject = {
      rate : formData.value.review.rate,
      cmt : formData.value.review.cmt,
      cakeid : formData.value.cakeid
    };
    this._httpService.addReview(formObject, id).subscribe(data => {
      console.log('added a review');
      formData.reset();
    });
  }
  cakeToShow(cake) {
    this.selectedCake = cake;
    console.log(cake, 'thats cake');
    this.showDetails = !this.showDetails; // click again to dismiss
  }
}
