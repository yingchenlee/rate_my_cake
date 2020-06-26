import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-displaycake',
  templateUrl: './displaycake.component.html',
  styleUrls: ['./displaycake.component.css']
})
export class DisplaycakeComponent implements OnInit {
  @Input() cakeToShow: any;
  sum = 0;
  counter = 0;
  average: number;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.avgRating();
  }
  avgRating() {
    for (let i of this.cakeToShow.reviews) {
      this.sum += i['rate'];
      this.counter ++;
    }
    this.average = this.sum / this.counter;
    console.log(this.cakeToShow);
  }

}
