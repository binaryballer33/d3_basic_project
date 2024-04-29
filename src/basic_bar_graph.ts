import * as d3 from 'd3'
import { createSvgContainer } from './helper_functions'
import { app } from './constants'

type BasicBarGraphProps = {
	title: string
	xAxisLabel: string
	yAxisLabel: string
	svgWidth: number
	svgHeight: number
	data: number[]
}

export default function createBasicBarGraph(props: BasicBarGraphProps) {
	const { title, xAxisLabel, yAxisLabel, data, svgWidth, svgHeight } = props
	const margin = { top: 50, right: 50, bottom: 50, left: 50 }
	const svgBasicBarGraph = createSvgContainer(app, svgWidth, svgHeight) // create SVG container

	const xScale = d3 // Create x-scale for the bar graph
		.scaleBand() // Create a band scale
		.domain(data.map((_d, i) => i.toString())) // Create an array of indexes for the data
		.range([margin.left, svgWidth - margin.right]) // Set the range of the x-axis
		.padding(0.2) // Add padding between the bars

	const yScale = d3 // Create y-scale for the bar graph
		.scaleLinear() // Create a linear scale
		.domain([0, 100]) // Set the domain of the y-axis
		.range([svgHeight - margin.bottom, margin.top]) // Set the range of the y-axis

	const xAxis = d3.axisBottom(xScale) // Create x-axis
	const yAxis = d3.axisLeft(yScale).ticks(20) // Create y-axis

	svgBasicBarGraph
		.append('g') // Append a group element to the SVG
		.attr('transform', `translate(0, ${svgHeight - margin.bottom})`) // Move the group element to the bottom of the SVG
		.call(xAxis) // add the x-axis to the graph

	svgBasicBarGraph
		.append('g') // Append a group element to the SVG
		.attr('transform', `translate(${margin.left}, 0)`) // Move the group element to the left of the SVG
		.call(yAxis) // add the y-axis to the graph

	svgBasicBarGraph
		.append('text') // Add a chart title
		.attr('x', svgWidth / 2) // center the text
		.attr('y', margin.top / 2) // set the y position
		.attr('text-anchor', 'middle') // center the text
		.attr('fill', 'white') // set the font color
		.style('font-size', '24px') // set the font size
		.text(title) // set the text

	svgBasicBarGraph
		.append('text') // Add x-axis label
		.attr('x', svgWidth / 2) // center the text
		.attr('y', svgHeight - margin.bottom / 2 + 16) // set the y position
		.attr('text-anchor', 'middle') // center the text
		.attr('fill', 'white') // set the font color
		.style('font-size', '16px') // set the font size
		.text(xAxisLabel) // set the text

	svgBasicBarGraph
		.append('text') // Add y-axis label
		.attr('transform', 'rotate(-90)') // rotate the text
		.attr('y', 0) // set the y position
		.attr('x', 0 - svgHeight / 2) // center the text
		.attr('dy', '1em') // center the text
		.attr('fill', 'white') // set the font color
		.style('text-anchor', 'middle') // center the text
		.text(yAxisLabel) // set the text

	svgBasicBarGraph
		.selectAll('rect') // Create the bars for the bar graph
		.data(data) // Bind data to the bars
		.enter() // Create new bars
		.append('rect') // Append a rectangle for each data point
		.attr('x', (_d, i) => xScale(i.toString())!) // Set the x position of the bar
		.attr('y', (d) => yScale(d)) // Set the y position of the bar
		.attr('width', xScale.bandwidth()) // Set the width of the bar
		.attr('height', (d) => svgHeight - margin.bottom - yScale(d)) // Set the height of the bar
		.attr('fill', '#d3d3d3') // Set the color of the bar

	// Add text to the top of each bar
	svgBasicBarGraph
		.selectAll('text.value') // Add text to bars
		.data(data) // Bind data to the text
		.enter() // Create new text
		.append('text') // Append text for each data point
		.attr('class', 'fakeClass') // Set the class of the text
		.attr('x', (_d, i) => xScale(i.toString())! + xScale.bandwidth() / 2) // Set the x position of the text
		.attr('y', (d) => yScale(d) - 5) // Set the y position of the text
		.attr('text-anchor', 'middle') // Center the text
		.attr('fill', '#d3d3d3') // Set the color of the text
		.text((d) => d.toString()) // Set the text
}
