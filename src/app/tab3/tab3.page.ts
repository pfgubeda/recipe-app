import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { StorageService } from '../storage.service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  searchField: FormControl;
  recipes: Recipe[] = [];
  recipesSearch: Recipe[] = [];
  constructor(private storageService: StorageService) {
    this.searchField = new FormControl('');
  }

  public async ngOnInit() {
    const searchTerm$ = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );
    this.recipes = await this.storageService.get('recipes');
    if (this.recipes == null) {
      this.recipes = [];
    }

    this.recipes.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    this.recipesSearch = this.recipes;
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 2000);
  }
  search($event: Event) {
    const searchTerm = ($event.target as HTMLInputElement).value;
    this.recipesSearch = this.recipes.filter((recipe) => {
      return recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  openRecipe(recipe: Recipe) {
    throw new Error('Method not implemented.');
  }
}
