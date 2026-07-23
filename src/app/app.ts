import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MOCK_RECIPES } from './mock-recipes';
import { RecipeModel } from './models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal<string>('My Recipe Box');
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0])

  protected handleRecipeClick(recipeId: number): void {
    console.log("Recipe clicked!", recipeId)
    const selectedRecipe = MOCK_RECIPES.find(r => r.id === recipeId)
    if (!selectedRecipe) return;
    this.recipe.set(selectedRecipe)
  }
}
