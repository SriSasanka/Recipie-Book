import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import {AuthService} from '../auth/auth.service';

@Injectable()

export class DataStorageService {
  constructor(private http: Http ,
              private recipeService: RecipeService,
              private authService: AuthService
  ) {}
  storeRecipes() {
    const token = this.authService.gettoken();
    const storeRecipes = this.http.put(
      'https://ng-recipe-book-91cc8.firebaseio.com/recipes.json?auth=' + token,
      this.recipeService.getRecipes()
    );
    return storeRecipes;
  }
  getRecipes() {
    const token = this.authService.gettoken();
    this.http
      .get('https://ng-recipe-book-91cc8.firebaseio.com/recipes.json?auth=' + token)
      .map(
        (response: Response) => {
          const recipies = response.json();
          // console.log(recipies);
          for (const recipe of recipies) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipies;
        }
      )
      .subscribe(
        (recipies: Recipe[]) => {

          this.recipeService.setRecipies(recipies);
        }
      );
  }
}
