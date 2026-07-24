import { Component, computed, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { MOCK_RECIPES } from '../mock-recipes';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  imports: [JsonPipe],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly title = signal<string>('My Recipe Box');
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0])
  protected readonly servings = signal<number>(1)

  protected handleRecipeClick(recipeId: number): void {
    console.log("Recipe clicked!", recipeId)
    const selectedRecipe = MOCK_RECIPES.find(r => r.id === recipeId)
    if (!selectedRecipe) return;
    this.recipe.set(selectedRecipe)
    this.servings.set(1)
  }

  protected decrease() {
    if (this.servings() > 1) {
      this.servings.update(prev => prev - 1)
    }
  }

  protected increase() {
    this.servings.update(prev => prev + 1)
  }

  protected readonly adjustIngredients = computed(() => {
    return this.recipe().ingredients.map(ingredient => ({ ...ingredient, quantity: ingredient.quantity * this.servings() }))
  })
}
