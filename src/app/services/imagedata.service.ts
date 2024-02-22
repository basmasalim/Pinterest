import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagedataService {
  constructor(private _HttpClient: HttpClient) {}

  page: number = 1;
  moreLoad: boolean = false;
  numberOfItem: number = 75;
  imageData: any[] = [];
  apiKey: any = '';

  apiArray: BehaviorSubject<any[]> = new BehaviorSubject([null]);
  loadImages(query: any): Observable<any> {
    return this._HttpClient.get(
      `https://api.unsplash.com/search/photos?page=${this.page}&query=${query}&per_page=${this.numberOfItem}&client_id=${this.apiKey}`
    );
  }
}
