import { app } from './constants'
import { createSvgContainer } from './helper_functions'

type BasicShapesProps = {
	title: string
	svgWidth: number
	svgHeight: number
}

export default function createBasicShapes(props: BasicShapesProps) {
	const { title, svgWidth, svgHeight } = props
	const margin = { top: 50, right: 50, bottom: 50, left: 50 }
	const svgBasicShapes = createSvgContainer(app, svgWidth, svgHeight)

	svgBasicShapes // Add text to the SVG
		.append('text')
		.text(title)
		.attr('x', svgWidth / 2) // center the text
		.attr('y', margin.top)
		.attr('font-family', 'sans-serif')
		.attr('font-size', '20px')
		.attr('fill', 'white')

	svgBasicShapes // Create a circle
		.append('circle')
		.attr('cx', 400)
		.attr('cy', 400)
		.attr('r', 100)
		.style('fill', 'blue')

	svgBasicShapes // Create a rectangle
		.append('rect')
		.attr('x', 300)
		.attr('y', 100)
		.attr('width', 300)
		.attr('height', 150)
		.style('fill', 'green')

	svgBasicShapes // Create a line
		.append('line')
		.attr('x1', 10)
		.attr('y1', 10)
		.attr('x2', 300)
		.attr('y2', 300)
		.style('stroke', 'red')
		.style('stroke-width', 2)
}
