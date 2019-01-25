import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-displaycake',
  templateUrl: './displaycake.component.html',
  styleUrls: ['./displaycake.component.css']
})
export class DisplaycakeComponent implements OnInit {
  allCakes: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAllCakes();
  }

  getAllCakes() {
    this._httpService.getCakes().subscribe( cakes => {
      console.log('got all the cakes!: ', cakes);
      this.allCakes = cakes;
    });
  }
}
