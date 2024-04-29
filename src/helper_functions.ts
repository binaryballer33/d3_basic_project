import { BaseType } from 'd3'

/* generate random percentages */
export function generateRandomPercentages() {
	let percentages = []
	let remaining = 100
	let minPercentage = 5

	for (let i = 0; i < 4; i++) {
		let random = Math.max(
			Math.floor(Math.random() * (remaining - minPercentage * (4 - i))),
			minPercentage,
		)
		percentages.push(random)
		remaining -= random
	}

	// Add the remaining percentage to the array
	percentages.push(remaining)

	return percentages
}

/* create a SVG container */
export function createSvgContainer(
	app: d3.Selection<BaseType, unknown, HTMLElement, any>,
	svgWidth: number,
	svgHeight: number,
) {
	return app.append('svg').attr('width', svgWidth).attr('height', svgHeight)
}

/* generate random test scores */
export function generateRandomTestScores() {
	return Array.from({ length: 10 }, () => Math.floor(Math.random() * 31) + 70)
}
