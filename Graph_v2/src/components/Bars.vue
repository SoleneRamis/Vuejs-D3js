<template>
  <div class="bars">
    <h1>{{ msg }}</h1>
    <br>
    <br>
    <div class="container">
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

let dataArray = [80, 50, 40, 35, 15, 10]
let width = 1000
let height = 1000
let mindate = new Date(2010, 0, 1)
let maxdate = new Date(2017, 0, 31)
let nbRect = 4
let x = 0
let y = 670
let rectId = ['svgGradientGY', 'svgGradientYO', 'svgGradientOR', 'svgGradientR']
let nbText = 4
let t = 80
let text = ['0 - 40', '40 - 60', '60 - 80', '80 - 100']
let colorStart = ['green', 'yellow', 'orange', 'red']
let colorEnd = ['yellow', 'orange', 'red', 'red']

export default {
  name: 'bars',
  data () {
    return {
      msg: 'Graphic bars',
      gradientGY: Object(),
      canvas: Object(),
      svg: Object(),
      defs: Object()
    }
  },
  mounted () {
    // variables color bars
    let color = d3.scaleLinear()
    .domain([0, 20, 80])
    .range(['green', 'yellow', 'red'])

    // variables axes x & y
    let widthScale = d3.scaleLinear()
    .domain([0, 120])
    .range([0, width])

    let heightScale = d3.scaleLinear()
    .domain([0, 100])
    .range([600, 0])

    let xScale = d3.scaleTime()
    .domain([mindate, maxdate])
    .range([0, width])

    let xAxis = d3.axisBottom()
    .scale(xScale)

    let yAxis = d3.axisLeft()
    .scale(heightScale)
    .ticks(10)

    // création bars
    this.canvas = d3.select('div')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(100, 10)')
    .style('fill-opacity', 0)

    this.canvas.selectAll('rect')
    .data(dataArray)
    .enter()
    .append('rect')
    .attr('width', function (d) { return widthScale(d) })
    .attr('height', 50)
    .attr('fill', function (d) { return color(d) })
    .attr('y', function (d, i) { return i * 100 })
    .attr('x', function (d, i) { return i * 0 })

    this.canvas.selectAll('rect')
    .transition()
    .delay(5)
    .duration(5000)
    .style('fill-opacity', 1)
    .attr('x', function (d, i) { return i * 150 })

    // création axes x & y
    this.canvas.append('g')
    .attr('transform', 'translate(0, 600)')
    .style('fill-opacity', 1)
    .call(xAxis)

    this.canvas.append('g')
    .attr('transform', 'translate(-50, 0)')
    .style('fill-opacity', 1)
    .call(yAxis)

    // légendes
    this.svg = d3.select('body').append('svg')
    .attr('width', 500)
    .attr('height', 300)

    this.defs = this.svg.append('defs')

    for (let i = 0; i < nbRect; i++) {
      this.gradient = this.linearGradient(rectId[i])
      this.rectangle(rectId[i], x, y)
      this.startColor(colorStart[i])
      this.endColor(colorEnd[i])
      x += 230
      y = 670
    }
    for (let i = 0; i < nbText; i++) {
      this.setText(text[i], t)
      t += 230
    }
  },
  methods: {

    linearGradient (rectId) {
      console.log('defs', this.defs)
      let gradient = this.defs.append('linearGradient')
      .attr('id', rectId)
      .attr('x1', '20%')
      .attr('x2', '100%')
      .attr('y1', '50%')
      .attr('y2', '50%')

      return gradient
    },
    startColor (colorStart) {
      console.log('defs', this.defs)
      this.gradient.append('stop')
      .attr('class', 'start')
      .attr('offset', '0%')
      .attr('stop-color', colorStart)
      .attr('stop-opacity', 1)
    },
    endColor (colorEnd) {
      console.log('defs', this.defs)
      this.gradient.append('stop')
      .attr('class', 'end')
      .attr('offset', '100%')
      .attr('stop-color', colorEnd)
      .attr('stop-opacity', 1)
    },
    rectangle (rectId, x) {
      this.canvas.append('rect')
      .attr('transform', 'translate(' + x + ', 670)')
      .attr('width', 70)
      .attr('height', 50)
      .attr('fill', 'url(#' + rectId + ')')
      .style('fill-opacity', 1)
    },
    setText (text, t) {
      this.canvas.append('text')
      .attr('transform', 'translate(' + t + ', 700)')
      .attr('fill', 'black')
      .style('fill-opacity', 1)
      .text(text)
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
}
</style>
