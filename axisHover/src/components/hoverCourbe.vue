<template>
  <div class="hover-courbe">
    <div class="container">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as d3 from 'd3'

let margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
    },
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

let parseTime = d3.timeParse("%d-%b-%y"),
    formatDate = d3.timeFormat("%d-%b");

export default {
  name: 'hover-courbe',
  components: {},
  data () {
    return {
      svg: Object(),
      valueLine: Object(),
      lineSvg: Object(),
      focus: Object(),
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
    this.xScale = d3.scaleTime().range([0, width]);
    this.yScale = d3.scaleLinear().range([height, 0]);

    // Define the axes
    this.xAxis = d3.axisBottom()
      .scale(this.xScale)
      .ticks(5);

    this.yAxis = d3.axisLeft()
      .scale(this.yScale)
      .ticks(5);

    this.svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    this.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(this.xAxis);

    this.svg.append("g")
        .attr("class", "y axis")
        .call(this.yAxis);

    this.lineSvg = this.svg.append("g");

    this.focus = this.svg.append("g")
        .style("display", "none");

    // append the x line
    this.focus.append("line")
        .attr("class", "x")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", height);

    // append the y line
    this.focus.append("line")
        .attr("class", "y")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("x1", width)
        .attr("x2", width);

    // append the circle at the intersection
    this.focus.append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "blue")
        .attr("r", 4);

    // place the value at the intersection
    this.focus.append("text")
        .attr("class", "y1")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    this.focus.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // place the date at the intersection
      this.focus.append("text")
        .attr("class", "y3")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "1em");
    this.focus.append("text")
        .attr("class", "y4")
        .attr("dx", 8)
        .attr("dy", "1em");

    let that = this;
    d3.json("static/data/dataCourbe.json", function(error, data) {
      data.forEach(function(d) {
        d.date = parseTime(d.date);
        d.close = +d.close;
      });

    let bisectDate = d3.bisector(function(d) {
        return d.date;
      }).left;

    that.valueLine = d3.line()
      .x(function(d) {
        return that.xScale(d.date);
      })
      .y(function(d) {
        return that.yScale(d.close);
      });

    that.xScale.domain(d3.extent(data, function(d) {
      return d.date;
    }));

    that.yScale.domain([0, d3.max(data, function(d) {
      return d.close;
    })]);

    that.lineSvg.append("path")
      .attr("class", "line")
      .attr("d", that.valueLine(data));

    // append the rectangle to capture mouse
    that.svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", function() {
        that.focus.style("display", null);
      })
      .on("mouseout", function() {
        that.focus.style("display", "none");
      })
      .on("mousemove", mousemove);

    function mousemove() {
      let x0 = that.xScale.invert(d3.mouse(this)[0]),
        i = bisectDate(data, x0, 1),
        d0 = data[i - 1],
        d1 = data[i],
        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  //    console.log(d3.mouse(this), x0);

      that.focus.select("circle.y")
      .attr("transform", "translate(" + that.xScale(d.date) + "," + that.yScale(d.close) + ")");

      that.focus.select("text.y1")
        .attr("transform", "translate(" + that.xScale(d.date) + "," + that.yScale(d.close) + ")")
        .text(d.close);

      that.focus.select("text.y2")
        .attr("transform", "translate(" + that.xScale(d.date) + "," + that.yScale(d.close) + ")")
        .text(d.close);

      that.focus.select("text.y3")
        .attr("transform", "translate(" + that.xScale(d.date) + "," + that.yScale(d.close) + ")")
        .text(formatDate(d.date));

      that.focus.select("text.y4")
        .attr("transform", "translate(" + that.xScale(d.date) + "," + that.yScale(d.close) + ")")
        .text(formatDate(d.date));

      that.focus.select(".x")
        .attr("transform", "translate(" + that.xScale(d.date) + "," + that.yScale(d.close) + ")")
        .attr("y2", height - that.yScale(d.close));

      that.focus.select(".y")
        .attr("transform", "translate(" + width * -1 + "," + that.yScale(d.close) + ")")
        .attr("x2", width + width);
      };
    });
  }
}
</script>

<style>
body {
  font: 12px Arial;
}

path {
  stroke: steelblue;
  stroke-width: 2;
  fill: none;
}

.axis path,
.axis line {
  fill: none;
  stroke: grey;
  stroke-width: 1;
  shape-rendering: crispEdges;
}
</style>
