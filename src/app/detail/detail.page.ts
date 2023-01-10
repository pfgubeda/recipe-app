import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Recipe } from '../models/recipe';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @Input()
  recipe : Recipe | undefined;
  urlVideo: any;
  constructor(private modalController: ModalController, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.urlVideo=this.recipe?.link;
  }
  async closeModal() {
    await this.modalController.dismiss();
  }
  videoUrl(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.urlVideo);
  }

}
