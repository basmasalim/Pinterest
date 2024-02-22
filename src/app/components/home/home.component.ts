import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ImagedataService } from 'src/app/services/imagedata.service';
import * as Masonry from 'masonry-layout';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgVideo from 'lightgallery/plugins/video';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgComment from 'lightgallery/plugins/comment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imageData: any[] = [];
  gridContainer: any; // Declare gridContainer property
  isLoading: boolean = false; // Add isLoading variable
  constructor(
    private _ImagedataService: ImagedataService,
    private elementRef: ElementRef, // Inject ElementRef,
    private renderer: Renderer2
  ) {}

  data: any = [];
  ngOnInit() {
    this.isLoading = true; // Set isLoading to true when loading starts
    this._ImagedataService.apiArray.subscribe((imageData) => {
      this.data = imageData;
      console.log(this.data);
      this.gridContainer = document.querySelector('.gridContainer');
      this.loadImages();
      this.isLoading = false;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      clientHeight + scrollTop >= scrollHeight - 50 &&
      !this._ImagedataService.moreLoad
    ) {
      this.appendNewImages();
      this._ImagedataService.moreLoad = true;
    }
  }

  loadMoreImages() {
    this._ImagedataService.page++;

    // Initialize Masonry after adding new images
    setTimeout(() => {
      new Masonry(this.gridContainer, {
        itemSelector: '.grid-item',
        columnWidth: 100,
        gutter: 10,
        fitWidth: true,
      });
    }, 1000);

    this._ImagedataService.moreLoad = false;
  }

  appendNewImages() {
    this.imageData = [...this.imageData, ...this.data?.results];
    this.loadMoreImages();
  }

  loadImages() {
    this.imageData = [...this.data?.results];
    this.loadMoreImages();
  }
  settings = {
    counter: false,
    plugins: [
      lgZoom,
      lgThumbnail,
      lgShare,
      lgRotate,
      lgFullscreen,
      lgVideo,
      lgAutoplay,
      lgComment,
    ],
  };
}
