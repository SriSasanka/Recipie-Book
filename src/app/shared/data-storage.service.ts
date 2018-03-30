import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    const params = new HttpParams().set('auth' , token);
    const url = 'https://recipie-book-afcfa.firebaseio.com//recipes.json';
    const req = new HttpRequest(
      'PUT' ,
      url ,
      this.recipeService.getRecipes() ,
      {
        reportProgress: true
      }
    );
    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();
    const params = new HttpParams().set('auth' , token);
    this.httpClient.get<Recipe[]>('https://recipie-book-afcfa.firebaseio.com//recipes.json',
      {
        params: params
      })
      .map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
