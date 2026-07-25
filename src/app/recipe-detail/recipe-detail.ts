import { Component, computed, input, signal } from '@angular/core';
import { RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-detail',
  imports: [],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  protected readonly servings = signal<number>(1)
  readonly recipe = input.required<RecipeModel>()

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
