import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { StorageService } from '../storage.service';
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

tags: string[] = [];

name: any;
link: string = "";
tagToAdd: any;

  constructor(private storageService : StorageService, private toastController: ToastController) {}

  addTag() {
    if(this.tagToAdd != null && this.tagToAdd != ""){
      this.tags.push(this.tagToAdd);
      this.tagToAdd = '';
      }
    }
  async addRecipe() {
    if(this.name != null && this.name != "" && this.link != null && this.link != ""){
      let recipes : Recipe[] = await this.storageService.get("recipes");
      if(recipes == null){
        recipes = [];
      }
      if(this.link.includes("https://www.youtube.com/watch?v=")){
      this.link = this.link.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
      }
      if(this.link.includes("https://youtu.be/")){
      this.link = this.link.replace("https://youtu.be/", "https://www.youtube.com/embed/");
      }
      let recipe : Recipe = new Recipe(this.name, this.link , this.tags, false, "");
      recipes.push(recipe);
      this.storageService.set("recipes", recipes);
      this.presentToast();
      this.name = '';
      this.link = '';
      this.tagToAdd = '';
      this.tags = [];
      } else {
        this.presentToastError();
      }

    }
  removeTag(tagRemoved: any) {
      this.tags.splice(this.tags.indexOf(tagRemoved), 1);
    }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Receta añadida',
      duration: 2000,
      position: 'top',
      icon: 'checkmark-circle-outline',
      keyboardClose: true
    });
    toast.present();
  }
  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Rellene los campos',
      duration: 2000,
      position: 'top',
      icon: 'close-circle-outline'
    });
    toast.present();
  }
}


