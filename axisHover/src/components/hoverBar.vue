<template>
  <div class="hover-bar">
    <div class="container">
    <svg width="720" height="500"></svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as d3 from 'd3'

let margin = {top: 20, right: 20, bottom: 30, left: 40},
    widthSVG = 720,
    heightSVG = 500,
    width = + widthSVG - margin.left - margin.right,
    height = + heightSVG - margin.top - margin.bottom;

export default {
  name: 'hover-bar',
  components: {},
  data () {
    return {
      svg: Object(),
      g: Object(),
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
    this.svg = d3.select("svg");

    this.xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1)
    this.yScale = d3.scaleLinear().rangeRound([height, 0]);

    this.xAxis = d3.axisBottom()
        .scale(this.xScale)
        .ticks(5);

    this.yAxis = d3.axisLeft()
        .scale(this.yScale)
        .ticks(10);

    this.g = this.svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let that = this;
    d3.json("static/data/data.json", function(error, data) {
    console.log("round 2", error, data);
    if (error) throw error;

    that.xScale.domain(data.data.map(function(d) { return d[0]; }));
    that.yScale.domain([0, d3.max(data.data, function(d) { return d[1]; })]);

    that.g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(that.xAxis);

    that.g.append("g")
    .attr("class", "axis axis--y")
    .call(that.yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Frequency");

    that.g.selectAll(".bar")
    .data(data.data)
    .enter().append("rect")
    .attr("class", "bar")
    .style("fill", "steelblue")
    .attr("x", function(d) { return that.xScale(d[0]); })
    .attr("y", function(d) { return that.yScale(d[1]); })
    .attr("width", that.xScale.bandwidth())
    .attr("height", function(d) { return height - that.yScale(d[1]); });
    });
  }
  }
</script>

<style>
.bar:hover {
  fill: brown !important;
}
.axis--x path {
  display: none;
}
</style>
