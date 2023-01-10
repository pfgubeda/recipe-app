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
link: any;
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
      let recipes : Recipe[] = await this.storageService.get("recipes"); //ya es un objecto de ts no hace falta parsear :D
      if(recipes == null){
        recipes = [];
      }
      //TODO: get unique id from youtube url
      this.link = this.link.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
      console.log(this.link);
      let recipe : Recipe = new Recipe(this.name, this.link , this.tags, false);
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


