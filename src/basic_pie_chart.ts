import * as d3 from 'd3'
import { app, svgHeight, svgWidth } from './constants'
import {
	createSvgContainer,
	generateRandomPercentages,
} from './helper_functions'

type PieArcDatumType = d3.PieArcDatum<number | { valueOf(): number }>

// Define the type for the PieArcDatum and prevent TypeScript from throwing an error
function createDefaultArcObject(d: PieArcDatumType): d3.DefaultArcObject {
	return {
		...d,
		innerRadius: 0,
		outerRadius: Math.min(svgWidth, svgHeight) / 2,
	}
}

export default function createBasicPieChart() {
	const svgBasicPieChart = createSvgContainer(app, svgWidth, svgHeight)
	let data = generateRandomPercentages() // Generate 5 random test scores from 70 to 100
	let pie = d3.pie() // Create the pie layout
	let arc = d3 // Create the arc generator
		.arc()
		.innerRadius(0)
		.outerRadius(Math.min(svgWidth, svgHeight - 100) / 2)

	// Add text to the SVG
	svgBasicPieChart
		.append('text')
		.text('Basic Pie Chart SVG')
		.attr('x', svgWidth / 2) // center the text horizontally
		.attr('y', 30) // position the text near the top of the SVG
		.attr('text-anchor', 'middle') // center the text
		.attr('font-family', 'sans-serif')
		.attr('font-size', '20px')
		.attr('fill', 'white')

	let g = svgBasicPieChart // Append a group element to the SVG, and move it to the center
		.append('g')
		.attr('transform', `translate(${svgWidth / 2},${svgHeight / 2})`) // move the group 30px down

	let arcs = g.selectAll('path').data(pie(data)).enter().append('g') // Create a group for each slice

	arcs // Add a path to each slice
		.append('path')
		.attr('d', (d: PieArcDatumType) => arc(createDefaultArcObject(d)))
		.style('fill', (_d, i: number) => d3.schemeCategory10[i % 10])

	arcs // Add percentage label to each slice using the arc.centroid() function
		.append('text')
		.attr('transform', function (d: PieArcDatumType) {
			return 'translate(' + arc.centroid(createDefaultArcObject(d)) + ')'
		})
		.attr('text-anchor', 'middle')
		.text(function (d: PieArcDatumType) {
			return d.data + '%'
		})
}
