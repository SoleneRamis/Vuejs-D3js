<template>
  <div class="started">
    <div class="container">
    <svg width="720" height="500"></svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as d3 from 'd3'

let w = 800,
    h = 400,
    padding = 25,
    dataset = [
      [10, 10],
      [20, 50],
      [30, 40],
      [40, 80],
      [50, 90],
      [60, 50],
      [70, 70],
      [80, 60],
      [90, 10],
      [100, 50],
      [110, 40],
      [120, 70],
      [130, 20],
      [140, 40],
      [150, 30]
    ]

export default {
  name: 'started',
  components: {},
  data () {
    return {
      svg: Object(),
      drag: Object(),
      line: Object(),
      points: Object(),
      xMax: Object(),
      yMax: Object(),
      xAxis: Object(),
      yAxis:Object(),
      xScale: null,
      yScale: null
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['getListOfResourcesState'])
  },
  created () {},
  mounted () {
    this.svg = d3.select("body")
    		.append("svg")
    		.attr("width", w)
    		.attr("height", h)
    		.attr("id", "chart")

    this.drag = d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    this.xScale = d3.scaleLinear()
    		.domain([0, d3.max(dataset, d => d[0])])
    		.range([padding, w - padding]);

    this.yScale = d3.scaleLinear()
    		.domain([0, d3.max(dataset, d => d[1])])
    		.range([h - padding, padding]);

    this.xAxis = d3.axisBottom()
    		.scale(this.xScale);

    this.yAxis = d3.axisLeft()
    	   .scale(this.yScale);

    this.svg.append("g")
    		.attr("class", "xaxis")
        .attr("transform", "translate(0," + (h - padding) + ")")
    		.call(this.xAxis);

    this.svg.append("g")
        .attr("class", "yaxis")
        .attr("transform", "translate(" + (h - 375) + ", 0)")
        .call(this.yAxis);

    let that = this
    this.lines = d3.line()
    		.x(d => that.xScale(d[0]))
    		.y(d => that.yScale(d[1]))
    		.curve(d3.curveMonotoneX);

    this.path = this.svg.append("path")
    		.attr("d", this.lines(dataset))
    		.attr("class", "lineChart");

    this.svg.select(".lineChart")
    		.style("opacity", 0)
    		.transition()
    		.duration(2500)
    		.delay(1000)
    		.style("opacity", 1);

    this.points = this.svg.selectAll("circle")
    		.data(dataset)
    		.enter()
    		.append("circle")
    		.call(this.drag);

    this.points.attr("cy", 0)
    		.transition()
    		.duration(1500)
    		.delay((d, i) => (i * 100) + 500)
    		.attr("cx", d => that.xScale(d[0]))
    		.attr("cy", d => that.yScale(d[1]))
    		.attr("r", 7)
    		.attr("class", "datapoint")
    		.attr("id",(d, i) => i)
    		.style("opacity", 1);

    this.yMax = d3.max(dataset, d => d[1]);
    this.xMax = d3.max(dataset, d => d[0]);

    function dragstarted() {
    		d3.event.sourceEvent.stopPropagation()
    		d3.select(this).classed("dragging datapoint", true)
    }

    function dragged() {
    		d3.select(this)
    				.attr("cx", Math.max(padding, Math.min(d3.event.x, w - padding)))
    				.attr("cy", Math.max(padding, Math.min(d3.event.y, h - padding)))
    }

    function dragended() {
    		d3.select(this).classed("datapoint", true)
    				// get id of dragged point
    		let id = d3.select(this).attr("id"),
    				// get new absolute position coordinates of the point
    				xPos = d3.select(this).attr("cx"),
    				yPos = h - d3.select(this).attr("cy")

    		// convert absolute position coordinates relative to scales
    		yPos = (yPos - padding) * (that.yMax / (h - (padding * 2)))
        xPos = (xPos - padding) * (that.xMax / (w - (padding * 2)))
    		dataset[id][0] = xPos
    		dataset[id][1] = yPos

    		// update line
    		that.svg.select(".lineChart")
    				.transition()
    				.duration(500)
    				.attr("d", that.lines(dataset))
    }
  }
}
</script>

<style>
body {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
div {
	margin: 20px auto 0;
	color: #aaa;
	font-weight: 100;
}
svg {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.xaxis path,
.xaxis line,
.yaxis path,
.yaxis line {
    stroke: #aaa;
    fill: none;
    shape-rendering: crispEdges;
}
.xaxis text,
.yaxis text {
    font-family: sans-serif;
    font-size: 11px;
    fill: #aaa;
}
.datapoint {
    cursor: pointer;
    stroke: transparent;
    fill: rgba(0, 150, 255, .75);
    stroke-width: 7;
}
.lineChart {
    fill: none;
    stroke-width: 3;
    stroke: rgba(100,100,100, 0.75);
}
</style>
