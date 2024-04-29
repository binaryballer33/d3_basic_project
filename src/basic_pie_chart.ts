import * as d3 from 'd3'
import { app } from './constants'
import { createSvgContainer } from './helper_functions'

type PieArcDatumType = d3.PieArcDatum<number | { valueOf(): number }>

// Define the type for the PieArcDatum and prevent TypeScript from throwing an error
function createDefaultArcObject(
	d: PieArcDatumType,
	svgWidth: number,
	svgHeight: number,
): d3.DefaultArcObject {
	return {
		...d,
		innerRadius: 0,
		outerRadius: Math.min(svgWidth, svgHeight) / 2,
	}
}

type BasicPieChartProps = {
	title: string
	labels: string[]
	svgWidth: number
	svgHeight: number
	data: number[]
}

export default function createBasicPieChart(props: BasicPieChartProps) {
	const { title, labels, svgWidth, svgHeight, data } = props
	const svgBasicPieChart = createSvgContainer(app, svgWidth, svgHeight)

	let pie = d3.pie() // Create the pie layout
	let arc = d3 // Create the arc generator
		.arc()
		.innerRadius(0)
		.outerRadius(Math.min(svgWidth, svgHeight - 100) / 2)

	svgBasicPieChart // Add text to the SVG
		.append('text') // Add a title to the pie chart
		.text(title) // Set the text
		.attr('x', svgWidth / 2) // center the text horizontally
		.attr('y', 30) // position the text near the top of the SVG
		.attr('text-anchor', 'middle') // center the text
		.attr('font-family', 'sans-serif') // set the font family
		.attr('font-size', '24px') // set the font size
		.attr('fill', 'white') // set the font color

	let g = svgBasicPieChart // Append a group element to the SVG, and move it to the center
		.append('g') // Create a group element
		.attr('transform', `translate(${svgWidth / 2},${svgHeight / 2})`) // move the group 30px down

	let arcs = g.selectAll('path').data(pie(data)).enter().append('g') // Create a group for each slice

	arcs // Add a path to each slice
		.append('path') // Create a path for each slice
		.attr('d', (d: PieArcDatumType) =>
			arc(createDefaultArcObject(d, svgWidth, svgHeight)),
		) // Set the path's d attribute using the arc generator
		.style('fill', (_d, i: number) => d3.schemeCategory10[i % 10]) // Set the color of each slice

	arcs // Add percentage label to each slice using the arc.centroid() function
		.append('text') // Add text to each slice
		.attr('transform', function (d: PieArcDatumType) {
			return (
				'translate(' +
				arc.centroid(createDefaultArcObject(d, svgWidth, svgHeight)) +
				')'
			) // Set the position of the text
		})
		.attr('text-anchor', 'middle') // center the text
		.text(function (d: PieArcDatumType) {
			return d.data + '%' // Set the text to the percentage
		})

	arcs // Add label to each slice using the arc.centroid() function
		.append('text') // Add text to each slice
		.attr('transform', function (d: PieArcDatumType, _i: number) {
			let pos = arc.centroid(createDefaultArcObject(d, svgWidth, svgHeight))
			pos[1] -= 25 // Move the label up
			return 'translate(' + pos + ')' // Set the position of the text
		})
		.attr('text-anchor', 'middle') // center the text
		.text(function (_d: PieArcDatumType, i: number) {
			return labels[i] // Set the text to the corresponding label
		})
}
