import './style.css'
import $ from 'jquery'
import {
	createBasicBarGraph,
	createBasicPieChart,
	createBasicShapes,
} from './src'
import {
	generateRandomPercentages,
	generateRandomTestScores,
} from './src/helper_functions'

const randomTestScores = generateRandomTestScores() // Generate random test scores
const randomPercentages = generateRandomPercentages() // Generate 5 random test scores from 70 to 100

// createBasicShapes({
// 	title: 'Basic Shapes SVG',
// 	svgWidth: 800,
// 	svgHeight: 800,
// })

createBasicBarGraph({
	title: 'Basic Bar Graph SVG',
	xAxisLabel: 'Tests',
	yAxisLabel: 'Grade',
	svgWidth: 800,
	svgHeight: 800,
	data: randomTestScores,
})

createBasicPieChart({
	title: 'Basic Pie Chart SVG',
	labels: ['TSLA', 'AAPL', 'AMD', 'COIN', 'AMZN'],
	svgWidth: 800,
	svgHeight: 800,
	data: randomPercentages,
})

$('svg').css('margin-bottom', '2rem') // add some bottom margin to each svg
