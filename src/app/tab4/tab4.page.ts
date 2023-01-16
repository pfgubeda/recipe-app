import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { Recipe } from '../models/recipe';
import { StorageService } from '../storage.service';

namespace Meals {
  export interface Meal {
    strMeal: string;
    strMealThumb: string;
    strYoutube: string;
    strTags: string;
  }
  export interface Meals {
    meals: Meal[];
  }
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  meal: Meals.Meal = {} as Meals.Meal;
  isYoutubeVideo: boolean = false;
  savedRecipe: boolean = false;
  recipes: Recipe[] = [];
  constructor(
    private httpClient: HttpClient,
    private domSanitizer: DomSanitizer,
    private storageService: StorageService,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    var object;
    this.savedRecipe = false;
    this.httpClient
      .get<Meals.Meals>('https://www.themealdb.com/api/json/v1/1/random.php')
      .subscribe((data) => {
        object = data;
        this.meal = object.meals[0];
        if (this.meal.strYoutube != null) {
          this.isYoutubeVideo = true;
          this.meal.strYoutube = this.meal.strYoutube.replace(
            'watch?v=',
            'embed/'
          );
        }
        if (this.meal.strTags != null) {
          this.meal.strTags = this.meal.strTags.replace(/,/g, ' ');
        } else {
          this.meal.strTags = '';
        }
        console.log(this.meal.strTags);
      });
    this.recipes = await this.storageService.get('recipes');
    if (this.recipes == null) {
      this.recipes = [];
    }
    for (let i = 0; i < this.recipes.length; i++) {
      if (this.recipes[i].name == this.meal.strMeal) {
        this.savedRecipe = true;
      }
    }
    console.log(this.savedRecipe);
  }
  ionViewDidEnter() {
    this.ngOnInit();
  }
  videoUrl() {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      this.meal.strYoutube
    );
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  async saveRecipe() {
    console.log("aaaa   " + this.savedRecipe);
    if (this.savedRecipe===false) {
      let recipe: Recipe;
      if (this.meal.strTags == '') {
        recipe = new Recipe(
          this.meal.strMeal,
          this.meal.strYoutube,
          [],
          false,
          this.meal.strMealThumb
        );
      } else {
        recipe = new Recipe(
          this.meal.strMeal,
          this.meal.strYoutube,
          this.meal.strTags.split(' '),
          false,
          this.meal.strMealThumb
        );
      }
      this.recipes.push(recipe);
      this.storageService.set('recipes', this.recipes);
      this.savedRecipe = true;
      this.presentToast();
    }
    else {
      console.log(this.savedRecipe);
      for (let i = 0; i < this.recipes.length; i++) {
        if (this.recipes[i].name == this.meal.strMeal) {
          this.recipes.splice(i, 1);
        }
      }
      this.storageService.set('recipes', this.recipes);
      this.savedRecipe = false;
      this.presentToastDelete();
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Receta añadida',
      duration: 2000,
      position: 'top',
      icon: 'checkmark-circle-outline',
      keyboardClose: true,
    });
    toast.present();
  }
  async presentToastDelete() {
    const toast = await this.toastController.create({
      message: 'Receta Borrada',
      duration: 2000,
      position: 'top',
      icon: 'checkmark-circle-outline',
      keyboardClose: true,
    });
    toast.present();
  }
}
