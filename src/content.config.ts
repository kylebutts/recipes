import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { glob } from "astro/loaders"

const recipes = defineCollection({
	loader: glob({
		pattern: "**/*.mdx",
		base: "./src/content/recipes",
		generateId: ({ entry }) => entry.replace(/\.mdx$/, ""),
	}),
	schema: z.object({
		title: z.string(),
		number: z.number().int().positive(),
		category: z.string(),
		description: z.string().nullable().optional(),
		size: z.union([z.string(), z.number()]).optional(),
		time: z.string(),
		author: z.string().nullable().optional(),
		website: z.string().nullable().optional(),
		source: z.url().optional(),
		original_title: z.string().nullable().optional(),
		tags: z.array(z.string()).default([]),
	}),
})
export const collections = { recipes }
