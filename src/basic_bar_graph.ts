import * as d3 from 'd3'
import { app, margin } from './constants'
import { createSvgContainer } from './helper_functions'

type BasicBarGraphProps = {
	title: string
	xAxisLabel: string
	yAxisLabel: string
	data: number[]
	svgWidth?: number
	svgHeight?: number
}

export default function createBasicBarGraph(props: BasicBarGraphProps) {
	let { title, xAxisLabel, yAxisLabel, data, svgWidth, svgHeight } = props
	svgWidth = svgWidth || 800 // set default width if not provided
	svgHeight = svgHeight || 800 // set default height if not provided
	const svgBasicBarGraph = createSvgContainer(app, svgWidth, svgHeight) // create SVG container

	svgBasicBarGraph // Append a group element to the SVG
		.attr('width', svgWidth + margin.left + margin.right) // Add margins to the SVG
		.attr('height', svgHeight + margin.top + margin.bottom + 25) // Add margins to the SVG

	const g = svgBasicBarGraph
		.append('g') // Append a group element to the SVG
		.attr('transform', `translate(${margin.left}, ${margin.top + 30})`) // Move the group element to the top left margin

	const yScale = d3.scaleLinear().domain([0, 100]).range([svgHeight, 0]) // Create y-scale for the bar graph

	const xScale = d3 // Create x-scale for the bar graph
		.scaleBand() // Create a band scale
		.domain(data.map((_d, i) => i.toString())) // Create an array of indexes for the data
		.range([0, svgWidth]) // Set the range of the x-axis
		.padding(0.2) // Add padding between the bars

	svgBasicBarGraph
		.append('text') // Add a chart title
		.attr('x', svgWidth / 2) // center the text
		.attr('y', margin.top) // set the y position
		.attr('text-anchor', 'middle') // center the text
		.style('font-size', '20px') // set the font size
		.style('fill', 'white') // set the font color
		.text(title) // set the text

	g.selectAll('rect') // Create the bars for the bar graph
		.data(data) // Bind data to the bars
		.enter() // Create new bars
		.append('rect') // Append a rectangle for each data point
		.attr('y', (d) => yScale(d)) // Set the y position of the bar
		.attr('height', (d) => svgHeight - yScale(d)) // Set the height of the bar
		.attr('width', xScale.bandwidth()) // Set the width of the bar
		.attr('transform', (_d, i) => `translate(${xScale(i.toString())}, 0)`) // Set the x position of the bar

	g.selectAll('text.bar') // Add text to bars
		.data(data) // Bind data to the text
		.enter() // Create new text
		.append('text') // Append text for each data point
		.attr('class', 'fakeClass') // Set the class of the text
		.attr('x', (_d, i) => xScale(i.toString())! + xScale.bandwidth() / 2) // Set the x position of the text
		.attr('y', (d) => yScale(d) + 20) // Set the y position of the text
		.attr('text-anchor', 'middle') // Center the text
		.attr('fill', 'white') // Set the color of the text
		.text((d) => d) // Set the text

	const yAxis = d3.axisLeft(yScale).ticks(20) // Create y-axis ticks for 0-100 with interval of 5 and append it to the group

	g.append('g').call(yAxis)

	g.append('text') // Create y-axis label
		.attr('transform', 'rotate(-90)')
		.attr('y', 0 - margin.left) // Set the y position of the label
		.attr('x', 0 - svgHeight / 2) // Set the x position of the label
		.attr('dy', '1em') // Center the label
		.attr('fill', 'white') // Set the color of the label
		.style('text-anchor', 'middle') // Center the label
		.text(yAxisLabel) // Set the text of the label

	const xAxis = d3.axisBottom(xScale).tickFormat((d) => `Test ${d + 1}`) // Create x-axis and append it to the group
	g.append('g').attr('transform', `translate(0, ${svgHeight})`).call(xAxis)

	g.append('text') // Create x-axis label
		.attr('y', svgHeight + margin.bottom / 2) // Set the y position of the label
		.attr('x', svgWidth / 2) // Set the x position of the label
		.attr('dy', '1em') // Center the label
		.attr('fill', 'white') // Set the color of the label
		.style('text-anchor', 'middle') // Center the label
		.text(xAxisLabel) // Set the text of the label
}
