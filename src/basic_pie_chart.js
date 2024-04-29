import * as d3 from 'd3'
import { app, svgHeight, svgWidth } from './constants'
import {
	createSvgContainer,
	generateRandomPercentages,
} from './helper_functions'

export default function createBasicPieChart() {
	const svgBasicPieChart = createSvgContainer(app, svgWidth, svgHeight)
	let data = generateRandomPercentages() // Generate 5 random test scores from 70 to 100
	let pie = d3.pie() // Create the pie layout
	let arc = d3 // Create the arc generator
		.arc()
		.innerRadius(0)
		.outerRadius(Math.min(svgWidth, svgHeight) / 2)

	let g = svgBasicPieChart // Append a group element to the SVG, and move it to the center
		.append('g')
		.attr('transform', `translate(${svgWidth / 2},${svgHeight / 2})`)

	let arcs = g.selectAll('path').data(pie(data)).enter().append('g') // Create a group for each slice

	arcs // Add a path to each slice
		.append('path')
		.attr('d', arc) // use the arc generator to create the path
		.style('fill', (d, i) => d3.schemeCategory10[i % 10]) // use a color from the d3 color scheme

	arcs // Add percentage label to each slice using the arc.centroid() function
		.append('text')
		.attr('transform', function (d) {
			return 'translate(' + arc.centroid(d) + ')'
		})
		.attr('text-anchor', 'middle')
		.text(function (d) {
			return d.data + '%'
		})

	svgBasicPieChart // Add text to the SVG
		.append('text')
		.text('Basic Pie Chart SVG')
		.attr('x', svgWidth - 200) // center the text
		.attr('y', 40)
		.attr('font-family', 'sans-serif')
		.attr('font-size', '20px')
		.attr('fill', 'white')
}
