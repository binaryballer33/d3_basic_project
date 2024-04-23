import * as d3 from 'd3'
import './style.css'
import $ from 'jquery'
import {
	createSvgContainer,
	generateRandomPercentages,
	generateRandomTestScores,
} from './helper_functions'

// get the app div
const app = d3.select('#app')

// Define SVG dimensions and margins, leave room for x and y axis labels
let margin = { top: 20, right: 20, bottom: 50, left: 50 }
let svgWidth = 800 - margin.left - margin.right
let svgHeight = 800 - margin.top - margin.bottom

function createBasicShapes() {
	const svgBasicShapes = createSvgContainer(app, svgWidth, svgHeight)

	// Add text to the SVG
	svgBasicShapes
		.append('text')
		.text('Basic Shapes SVG')
		.attr('x', svgWidth / 2) // center the text
		.attr('y', margin.top)
		.attr('font-family', 'sans-serif')
		.attr('font-size', '20px')
		.attr('fill', 'white')

	// Create a circle
	svgBasicShapes
		.append('circle')
		.attr('cx', 400)
		.attr('cy', 400)
		.attr('r', 100)
		.style('fill', 'blue')

	// Create a rectangle
	svgBasicShapes
		.append('rect')
		.attr('x', 300)
		.attr('y', 100)
		.attr('width', 300)
		.attr('height', 150)
		.style('fill', 'green')

	// Create a line
	svgBasicShapes
		.append('line')
		.attr('x1', 10)
		.attr('y1', 10)
		.attr('x2', 300)
		.attr('y2', 300)
		.style('stroke', 'red')
		.style('stroke-width', 2)
}

function createBasicBarGraph() {
	// Generate random test scores
	const data = generateRandomTestScores()
	const svgBasicBarGraph = createSvgContainer(app, svgWidth, svgHeight)

	// Create SVG container
	let g = svgBasicBarGraph
		.attr('width', svgWidth + margin.left + margin.right) // Add margins to the SVG
		.attr('height', svgHeight + margin.top + margin.bottom) // Add margins to the SVG
		.append('g') // Append a group element to the SVG
		.attr('transform', `translate(${margin.left}, ${margin.top})`) // Move the group element to the top left margin

	// Create y-scale for the bar graph
	let yScale = d3.scaleLinear().domain([0, 100]).range([svgHeight, 0])

	// Create x-scale for the bar graph
	let xScale = d3
		.scaleBand()
		.domain(data.map((d, i) => i))
		.range([0, svgWidth])
		.padding(0.2)

	// Create the bars for the bar graph
	g.selectAll('rect')
		.data(data) // Bind data to the bars
		.enter() // Create new bars
		.append('rect') // Append a rectangle for each data point
		.attr('y', (d) => yScale(d)) // Set the y position of the bar
		.attr('height', (d) => svgHeight - yScale(d)) // Set the height of the bar
		.attr('width', xScale.bandwidth()) // Set the width of the bar
		.attr('transform', (d, i) => `translate(${xScale(i)}, 0)`) // Set the x position of the bar

	// Add text to bars
	g.selectAll('text.bar')
		.data(data) // Bind data to the text
		.enter() // Create new text
		.append('text') // Append text for each data point
		.attr('class', 'bar') // Set the class of the text
		.attr('x', (_d, i) => xScale(i) + xScale.bandwidth() / 2) // Set the x position of the text
		.attr('y', (d) => yScale(d) + 20) // Set the y position of the text
		.attr('text-anchor', 'middle') // Center the text
		.attr('fill', 'white') // Set the color of the text
		.text((d) => d)

	// Create y-axis
	let yAxis = d3.axisLeft(yScale).ticks(21) // 21 ticks for 0-100 with interval of 5
	g.append('g').call(yAxis)

	// Create y-axis label
	g.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 0 - margin.left)
		.attr('x', 0 - svgHeight / 2)
		.attr('dy', '1em')
		.attr('fill', 'white')
		.style('text-anchor', 'middle')
		.text('Grade')

	// Create x-axis
	let xAxis = d3.axisBottom(xScale).tickFormat((d) => `Test ${d + 1}`)
	g.append('g').attr('transform', `translate(0, ${svgHeight})`).call(xAxis)

	// Create x-axis label
	g.append('text')
		.attr('y', svgHeight + margin.bottom / 2)
		.attr('x', svgWidth / 2)
		.attr('dy', '1em')
		.attr('fill', 'white')
		.style('text-anchor', 'middle')
		.text('Test Scores')

	// Add a chart title
	g.append('text')
		.attr('x', svgWidth / 2)
		.attr('y', margin.top)
		.attr('text-anchor', 'middle')
		.style('font-size', '20px')
		.style('fill', 'white')
		.text('Basic Bar Graph SVG')
}

function createBasicPieChart() {
	const svgBasicPieChart = createSvgContainer(app, svgWidth, svgHeight)

	// Generate 5 random test scores from 70 to 100
	let data = generateRandomPercentages()

	// Create the pie layout
	let pie = d3.pie()

	// Create the arc generator
	let arc = d3
		.arc()
		.innerRadius(0)
		.outerRadius(Math.min(svgWidth, svgHeight) / 2)

	// Append a group element to the SVG, and move it to the center
	let g = svgBasicPieChart
		.append('g')
		.attr('transform', `translate(${svgWidth / 2},${svgHeight / 2})`)

	// Create a group for each slice
	let arcs = g.selectAll('path').data(pie(data)).enter().append('g')

	// Add a path to each slice
	arcs
		.append('path')
		.attr('d', arc) // use the arc generator to create the path
		.style('fill', (d, i) => d3.schemeCategory10[i % 10]) // use a color from the d3 color scheme

	// Add percentage label to each slice using the arc.centroid() function
	arcs
		.append('text')
		.attr('transform', function (d) {
			return 'translate(' + arc.centroid(d) + ')'
		})
		.attr('text-anchor', 'middle')
		.text(function (d) {
			return d.data + '%'
		})

	// Add text to the SVG
	svgBasicPieChart
		.append('text')
		.text('Basic Pie Chart SVG')
		.attr('x', svgWidth - 200) // center the text
		.attr('y', 40)
		.attr('font-family', 'sans-serif')
		.attr('font-size', '20px')
		.attr('fill', 'white')
}

createBasicShapes()
createBasicBarGraph()
createBasicPieChart()

// add some bottom margin to each svg
$('svg').css('margin-bottom', '2rem')
