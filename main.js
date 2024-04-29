import './style.css'
import $ from 'jquery'
import {
	createBasicBarGraph,
	createBasicPieChart,
	createBasicShapes,
} from './src'

createBasicShapes()
createBasicBarGraph()
createBasicPieChart()

$('svg').css('margin-bottom', '2rem') // add some bottom margin to each svg
