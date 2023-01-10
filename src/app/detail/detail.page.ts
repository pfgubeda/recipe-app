import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @Input()
  recipe : Recipe | undefined;
  urlVideo: any;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.urlVideo=this.recipe?.link;
    console.log(this.recipe?.link);
  }
  async closeModal() {
    await this.modalController.dismiss();
  }

}
