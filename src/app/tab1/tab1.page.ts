import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { StorageService } from '../storage.service';
import { ModalController, ToastController } from '@ionic/angular';
import { DetailPage } from '../detail/detail.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  recipes: Recipe[] = [];
  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}
  ionViewDidEnter(){
    this.ngOnInit();
  }
  public async ngOnInit() {
    this.recipes = await this.storageService.get('recipes');
    if (this.recipes == null) {
      this.recipes = [];
    }

    this.recipes.sort((a, b) => {
      if (a.fav == b.fav) {
        return a.name.localeCompare(b.name);
      } else if (a.fav) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }





  async showDetails(recipe: Recipe) {
    const modal = await this.modalController.create({
      component: DetailPage,
      componentProps: {
        recipe: recipe,
      },
    });
    modal.onDidDismiss().then((data) => {
      this.ngOnInit();
    });
    return await modal.present();
  }





  removeFav($event: MouseEvent, recipe: Recipe) {
    $event.stopPropagation();
    this.recipes.forEach((r) => {
      if (r.name == recipe.name) {
        r.fav = false;
      }
    });
    this.storageService.set('recipes', this.recipes);
    this.presentToastNoFav();
  }
  addFav($event: MouseEvent, recipe: Recipe) {
    $event.stopPropagation();
    this.recipes.forEach((r) => {
      if (r.name == recipe.name) {
        r.fav = true;
      }
    });
    this.storageService.set('recipes', this.recipes);
    this.presentToastFav();
  }
  async presentToastFav() {
    const toast = await this.toastController.create({
      message: 'Receta añadida a Favoritos',
      duration: 2000,
      position: 'top',
      icon: 'checkmark-circle-outline',
      keyboardClose: true,
    });
    toast.present();
  }
  async presentToastNoFav() {
    const toast = await this.toastController.create({
      message: 'Receta quitada de Favoritos',
      duration: 2000,
      position: 'top',
      icon: 'checkmark-circle-outline',
      keyboardClose: true,
    });
    toast.present();
  }
}
