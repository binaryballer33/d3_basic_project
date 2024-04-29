import * as d3 from 'd3'

export const app = d3.select('#app') // get the app div
export const margin = { top: 20, right: 20, bottom: 50, left: 50 } // Define SVG dimensions and margins, leave room for x and y axis labels
export const svgWidth = 800 - margin.left - margin.right
export const svgHeight = 800 - margin.top - margin.bottom
