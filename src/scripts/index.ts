const index = document.querySelector<HTMLElement>("#recipe-index")!
const search = document.querySelector<HTMLInputElement>("#search")!
const cards = [...document.querySelectorAll<HTMLElement>(".recipe-card")]
const tagButtons = [
	...document.querySelectorAll<HTMLButtonElement>("[data-tag]"),
]
let activeTag = ""
function filter() {
	const words = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean)
	let count = 0
	for (const card of cards) {
		const matches =
			words.every((word) => card.dataset.search!.includes(word)) &&
			(!activeTag || JSON.parse(card.dataset.tags!).includes(activeTag))
		card.hidden = !matches
		if (matches) count++
	}
	document.querySelector("#result-count")!.textContent =
		`${count} ${count === 1 ? "RECIPE" : "RECIPES"}`
	;(document.querySelector("#no-results") as HTMLElement).hidden = count > 0
	tagButtons.forEach((button) =>
		button.setAttribute(
			"aria-pressed",
			String(button.dataset.tag === activeTag),
		),
	)
}
search.addEventListener("input", filter)
tagButtons.forEach((button) =>
	button.addEventListener("click", () => {
		activeTag = button.dataset.tag!
		filter()
	}),
)
document.querySelector("#reset-filters")!.addEventListener("click", () => {
	search.value = ""
	activeTag = ""
	filter()
	search.focus()
})
const layoutButtons = [
	...document.querySelectorAll<HTMLButtonElement>("button[data-layout]"),
]
function setLayout(layout: string) {
	index.dataset.layout = layout === "compact" ? "compact" : "grid"
	layoutButtons.forEach((button) =>
		button.setAttribute(
			"aria-pressed",
			String(button.dataset.layout === index.dataset.layout),
		),
	)
}
try {
	setLayout(localStorage.getItem("recipe-layout") ?? "compact")
} catch {
	/* Storage is optional. */
}
layoutButtons.forEach((button) =>
	button.addEventListener("click", () => {
		setLayout(button.dataset.layout!)
		try {
			localStorage.setItem("recipe-layout", button.dataset.layout!)
		} catch {
			/* Storage is optional. */
		}
	}),
)
