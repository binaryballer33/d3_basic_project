/* generate random percentages */
export function generateRandomPercentages() {
	let percentages = []
	let remaining = 100

	for (let i = 0; i < 4; i++) {
		let random = Math.floor(Math.random() * remaining)
		percentages.push(random)
		remaining -= random
	}

	// Add the remaining percentage to the array
	percentages.push(remaining)

	return percentages
}

/* create a SVG container */
export function createSvgContainer(app, svgWidth, svgHeight) {
	return app.append('svg').attr('width', svgWidth).attr('height', svgHeight)
}

export function generateRandomTestScores() {
	return Array.from({ length: 5 }, () => Math.floor(Math.random() * 31) + 70)
}
