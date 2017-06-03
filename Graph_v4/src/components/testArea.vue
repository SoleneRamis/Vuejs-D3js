<template>
  <div class="test-area">
    <div class="container">
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

let w = 800;
let h = 450;
let margin = {
  top: 58,
  bottom: 100,
  left: 80,
  right: 40
};
let width = w - margin.left - margin.right;
let height = h - margin.top - margin.bottom;

let dateParser = d3.timeParse("%Y/%m/%d");

export default {
  name: 'test-area',
  components: {},
  data () {
    return {
      svg: Object(),
      chart: Object(),
      area: Object(),
      xAxis: Object(),
      yAxis: Object(),
      xAxisScale: null,
      yAxisScale: null
    }
  },
  watch: {},
  computed: {},
  created () {},
  mounted () {
    this.svg = d3.select("div").append("svg")
          .attr("id", "chart")
          .attr("width", w)
          .attr("height", h);

    this.chart = this.svg.append("g")
          .classed("display", true)
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let that = this;
    d3.json("static/data/dataArea.json", function(error, data) {
      data.forEach(function(d) {
        d.value = d.value;
        d.date = d.date;
      });

    that.xAxisScale = d3.scaleTime()
                .domain(d3.extent(data, function(d){
                  let date = dateParser(d.date);
                  return date
                }))
                .range([0, width])

    that.yAxisScale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d){
                  return d.value
                })])
                .range([height, 0])

    that.xAxis = d3.axisBottom(that.xAxisScale)
                .tickFormat(d3.timeFormat("%m/%d"))
                .ticks(d3.timeDay.every(7));

    that.yAxis = d3.axisLeft(that.yAxisScale)
                .ticks(5);

    that.area = d3.area()
                  .x(function(d){
                    let date = dateParser(d.date);
                    return that.xAxisScale(date)
                  })
    			        .y0(height)
    		        	.y1(function(d){
    			          	return that.yAxisScale(d.value);
    		        	})
                  .curve(d3.curveMonotoneX);

  function plot(params){
      //create axis for x and y
    	this.append("g")
    		.classed("x axis", true)
    		.attr("transform", "translate(0," + height + ")")
    		.call(params.axis.x);
    	this.append("g")
    		.classed("y axis", true)
    		.attr("transform", "translate(0,0)")
    		.call(params.axis.y);

      this.selectAll(".area")
        .data([params.data])
        .enter()
        .append("path")
        .classed("area", true);

      this.selectAll(".trendline")
        .data([params.data])
        .enter()
          .append("path")
          .classed("trendline", true);

    	this.selectAll(".point")
    		.data(params.data)
    		.enter()
    			.append("circle")
    			.classed("point", true)
    			.attr("r", 2);

      this.selectAll(".area")
        .attr("d", function(d){
        return that.area(d)
      })
      .style("fill", "purple")
      .style("opacity", "0.25")
      .style ("stroke", "#ccc")
      .style("stroke-width", "1px");

    	this.selectAll(".point")
    		.attr("cx", function(d){
    			let date = dateParser(d.date);
    			return that.xAxisScale(date);
    		})
    		.attr("cy", function(d){
    			return that.yAxisScale(d.value);
    		})

      this.selectAll(".area")
        .data([params.data])
        .exit()
        .remove()

      this.selectAll(".trendline")
        .data([params.data])
        .exit()
        .remove()

    	this.selectAll(".point")
    		.data(params.data)
    		.exit()
    		.remove();
    }

    plot.call(that.chart, {
    	data: data,
      axis: {
        x: that.xAxis,
        y: that.yAxis
      }
    });
        });
  }
  }
</script>

<style lang="css" scoped>

</style>
