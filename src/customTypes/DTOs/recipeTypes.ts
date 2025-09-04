import { Category } from "./categoryTypes"

export type MeasurementUnit = {
    measurementUnitId: number,
    name: string,
    abbreviation: string
}

export type Step = {
    stepId: number | null
    recipeId: number | null
    text: string
    sortOrder: number
}

export type RecipeIngredientDTO = {
    recipeIngredientId: number | null
    recipeId: number | null
    sortOrder: number
    measurementUnitId: number | null
    quantityNumber: number | null
    ingredientName: string | null
}

export type Recipe = {
    recipeId: number | null
    name: string
    // TODO: Change to Date type after backend is updated.
    cookingTime: string
    createdOn: Date | null
    groupId: number | null
    steps: Step[] | null
    recipeIngredients: RecipeIngredientDTO[] | null
    categories: Category[] | null
}