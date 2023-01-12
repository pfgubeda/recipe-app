import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Recipe } from '../models/recipe';
import {DomSanitizer} from '@angular/platform-browser';
import { StorageService } from '../storage.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @Input()
  recipe : Recipe | undefined;
  urlVideo: any;
  detailsInput: any;
  isYoutubeVideo: boolean = false;
  constructor(private modalController: ModalController, private domSanitizer: DomSanitizer, private storageService : StorageService, private alertController:AlertController) { }

  ngOnInit() {
    this.urlVideo=this.recipe?.link;
    if(this.urlVideo.includes("youtube")){
      this.isYoutubeVideo=true;
    }
    this.detailsInput=this.recipe?.details;
  }
  async closeModal() {
    await this.modalController.dismiss();
  }
  videoUrl(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.urlVideo);
  }
  async saveDetails(){
    if(this.recipe){
      let recipes : Recipe[] = await this.storageService.get("recipes");
      if(recipes == null){
        recipes = [];
      }
      for (let i = 0; i < recipes.length; i++) {
        if(recipes[i].name==this.recipe.name){
          recipes[i].details=this.detailsInput;
        }
      }
      this.storageService.set("recipes", recipes);
    }
  }
  async deleteRecipeAlert(){
      const alert = await this.alertController.create({
        header: 'Eliminar receta',
        message: '¿Estás seguro de que quieres eliminar esta receta?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
          }, {
            text: 'Eliminar',
            role: 'destructive',
            handler: () => {
              this.deleteRecipe();
            },
          }
        ]
      });
      await alert.present();
  }
  async deleteRecipe(){
    if(this.recipe){
      let recipes : Recipe[] = await this.storageService.get("recipes");
      if(recipes == null){
        recipes = [];
      }
      for (let i = 0; i < recipes.length; i++) {
        if(recipes[i].name==this.recipe.name){
          recipes.splice(i, 1);
        }
      }
      this.storageService.set("recipes", recipes);
      this.closeModal();
    }
  }
}
