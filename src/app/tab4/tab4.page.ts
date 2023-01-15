import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

namespace Meals{
  export interface Meal {
    strMeal: string;
    strMealThumb: string;
    strYoutube: string;
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
  constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) {



   }

  ngOnInit() {
    var object;
    this.httpClient.get<Meals.Meals>('https://www.themealdb.com/api/json/v1/1/random.php').subscribe(data => {
        object = data;
        this.meal = object.meals[0];
        if(this.meal.strYoutube != null){
          this.isYoutubeVideo = true;
          this.meal.strYoutube = this.meal.strYoutube.replace("watch?v=", "embed/");
        }
    });
  }
  ionViewDidEnter(){
    this.ngOnInit();
  }
  videoUrl(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.meal.strYoutube);
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }
}
