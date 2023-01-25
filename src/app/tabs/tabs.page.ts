import { Component } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
firstTime: boolean = true;

  constructor(private swipe:SwiperModule, private storageService:StorageService) {}

  ngOnInit() {
    this.storageService.get('firstTime').then((val) => {
      if (val == null) {
        this.firstTime = true;
      } else {
        this.firstTime = false;
      }
    });
  }
  click(){
    this.storageService.get('firstTime').then((val) => {
      this.firstTime = false;
      if (val == null) {
        this.storageService.set('firstTime', false);
      }
    });
  }
}
