import './style.css'
import $ from 'jquery'
import {
	createBasicBarGraph,
	createBasicPieChart,
	createBasicShapes,
} from './src'
import { generateRandomTestScores } from './src/helper_functions'

const randomTestScores = generateRandomTestScores() // Generate random test scores

createBasicShapes()
createBasicBarGraph({
	title: 'Basic Bar Graph SVG',
	xAxisLabel: 'Test Scores',
	yAxisLabel: 'Grade',
	data: randomTestScores,
})
createBasicPieChart()

$('svg').css('margin-bottom', '2rem') // add some bottom margin to each svg
