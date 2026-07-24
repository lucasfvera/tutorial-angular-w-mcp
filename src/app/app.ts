import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonPipe } from '@angular/common'
import { MOCK_RECIPES } from './mock-recipes';
import { RecipeModel } from './models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
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
