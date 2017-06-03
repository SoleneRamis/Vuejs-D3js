<template>
  <div class="points-hover">
    <div class="container">
      <div id="svg"></div>
        <canvas width="800" height="400" style="display:none"></canvas>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as d3 from 'd3'

let height = 400;
let margin = { bottom: 40, left: 40, top: 40, right: 40 };
let width = 800;


export default {
  name: 'points-hover',
  components: {},
  data () {
    return {
      line: Object(),
      area: Object(),
      xAxis: Object(),
      yAxis: Object(),
      svg: Object(),
      canvas: Object(),
      css: null,
      xScale: null,
      yScale: null,
      x2Scale: null,
      y2Scale: null

    }
  },
  watch: {},
  computed: {
    ...mapGetters(['getListOfResourcesState'])
  },
  created () {},
  mounted () {
    this.svg = d3.select('#svg').append('svg');
    this.svg.attr('width', width);
    this.svg.attr('height', height);
    this.svg.attr('class', 'chart');

    this.xScale = d3.scaleLinear()
    .range([margin.left, width - margin.right])
    .domain([100, 200]);

    this.xAxis = d3.axisBottom()
    .scale(this.xScale);

    this.svg.append('svg:g')
      .attr('transform', 'translate(0,' +(height-margin.bottom)+')')
      .call(this.xAxis);

    this.yScale = d3.scaleLinear()
    .range([margin.top, height - margin.bottom])
    .domain([100, 500]);

    this.yAxis = d3.axisLeft()
    .scale(this.yScale);

    this.svg.append('svg:g')
      .attr("transform", 'translate(' + (margin.left) + ', 0)')
      .call(this.yAxis);

    this.y2Scale = d3.scaleLinear()
    .range([margin.top, height - margin.bottom])
    .domain([300, 800]);

    this.y2Axis = d3.axisRight()
    .scale(this.y2Scale);

    this.svg.append('svg:g')
      .attr("transform", 'translate(' + (width - margin.right) + ', 0)')
      .call(this.y2Axis);

    this.svg.append('style')
       .attr('type', 'text/css')

    this.area = d3.area()
       .x(function(d) { return that.xScale(d.x); })
       .y0(height - margin.bottom)
       .y1(function(d) { return that.yScale(d.y); });

    this.line = d3.line()
       .x(function(d){ return that.xScale(d.x); })
       .y(function(d){ return that.yScale(d.y); });

    let that = this
    d3.json("static/data/dataPointsHover.json", function(error, data) {
      data.forEach(function(d) {
        d.x = d.x;
        d.y = d.y;
      });

    that.svg.append('svg:path')
      .attr('class', 'area')
      .attr('d', that.area(data));

    that.svg.append('svg:path')
      .attr('class', 'line')
      .attr('d', that.line(data))
      .attr('stroke-width', 1);

    that.svg.selectAll(".dot")
       .data(data)
       .enter()
       .append("circle")
       .attr('class','data-point')
       .attr('cx', function(d) { return that.xScale(d.x); })
    	 .attr('cy', function(d) { return that.yScale(d.y); })
       .attr('r', 4)
       .on('mouseover',function() {
         d3.select(this).attr('r', 6)
        .append( 'text' )
           .attr( 'class', 'text' )
           .attr( 'text-anchor', 'middle' )
           .text( 'Date: ');
       })
       .on('mouseout', function() {
         d3.select(this).attr('r', 4);
       });
     });
  }
}
</script>

<style>
body {
  padding: 50px;
}
#svg {
  height: 400px;
  width: 800px;
}
path{
  fill: none;
  stroke: #a2afb4;
  stroke-width: 1.5;
}
.tick {
  fill: #a2afb4;
  font-size: 11px;
  font-family: sans-serif;
}
.line {
  stroke: #00ab4d;
  stroke-width: 2
}

.area {
  fill: rgba(0,171,71,.2);
  stroke: none;
  stroke-width: 0
}
.data-point {
  fill: #fff;
  stroke: rgba(0,171,71,1);
  stroke-width: 2
}
line {
  fill: none;
  stroke: rgba(162,175,180,.5);
  stroke-width: 1
}
text {
  font-family: Arial,sans-serif;
}
</style>
