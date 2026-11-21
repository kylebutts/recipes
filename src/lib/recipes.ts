import { getCollection, type CollectionEntry } from "astro:content"

export async function getUniqueRecipes(): Promise<
	CollectionEntry<"recipes">[]
> {
	const recipes = await getCollection("recipes")
	const numbers = new Map<number, string>()
	for (const recipe of recipes) {
		const previous = numbers.get(recipe.data.number)
		if (previous)
			throw new Error(
				`Duplicate recipe number ${recipe.data.number}: ${previous} and ${recipe.id}`,
			)
		numbers.set(recipe.data.number, recipe.id)
	}
	return recipes
}

export function recipeNumber(number: number): string {
	return String(number).padStart(3, "0")
}

export function recipeUrl(id: string): string {
	return `${import.meta.env.BASE_URL}${id}.html`
}
