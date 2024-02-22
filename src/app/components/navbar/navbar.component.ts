import { Component, OnInit } from '@angular/core';
import { ImagedataService } from 'src/app/services/imagedata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoading: boolean = false;
  query: string = 'anime';

  constructor(private _ImagedataService: ImagedataService) {}

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    this.isLoading = true;
    console.log(this.query);
    this._ImagedataService.loadImages(this.query).subscribe(
      (data) => {
        console.log(data);
        this._ImagedataService.apiArray.next(data);
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }
}
