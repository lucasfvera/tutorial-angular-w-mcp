import { Component, computed, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { MOCK_RECIPES } from '../mock-recipes';
import { JsonPipe } from '@angular/common';
import { RecipeDetail } from "../recipe-detail/recipe-detail";

@Component({
  selector: 'app-recipe-list',
  imports: [JsonPipe, RecipeDetail],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly title = signal<string>('My Recipe Box');
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0])

  protected handleRecipeClick(recipeId: number): void {
    console.log("Recipe clicked!", recipeId)
    const selectedRecipe = MOCK_RECIPES.find(r => r.id === recipeId)
    if (!selectedRecipe) return;
    this.recipe.set(selectedRecipe)
  }
}
