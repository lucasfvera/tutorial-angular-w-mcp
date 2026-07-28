import { Component, computed, signal } from '@angular/core';
import { RecipeModel } from '../models';
import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeDetail } from "../recipe-detail/recipe-detail";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail, FormsModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly title = signal<string>('My Recipe Box');
  protected readonly allRecipes = signal<RecipeModel[]>(MOCK_RECIPES)
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0])
  protected readonly searchTerm = signal<string>("")

  protected readonly filteredRecipes = computed<RecipeModel[]>(() => this.allRecipes().filter((r) => r.name.toLocaleLowerCase().includes(this.searchTerm().toLocaleLowerCase())))

  protected handleRecipeClick(recipeId: number): void {
    console.log("Recipe clicked!", recipeId)
    const selectedRecipe = MOCK_RECIPES.find(r => r.id === recipeId)
    if (!selectedRecipe) return;
    this.recipe.set(selectedRecipe)
  }
}
