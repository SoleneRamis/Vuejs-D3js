<template>
  <div class="started">
    <div class="container">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as d3 from 'd3'

export default {
  name: 'started',
  components: {},
  data () {
    return {
      innerSpace: Object(),
      xAxis: Object(),
      yAxis: Object(),
      xAxisScale: null,
      yAxisScale: null
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['getListOfResourcesState'])
  },
  created () {},
  mounted () {
    let svgWidth  = 400,
        svgHeight = 400,
        originalCircle = {"cx": 100, "cy": 100, "radius": 20},
        margin = {"top": 25, "right": 25, "bottom": 50, "left": 50},
        width  = svgWidth - margin.left - margin.right,
        height = svgHeight - margin.top  - margin.bottom;

    let svgViewport = d3.select("div").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    this.xAxisScale = d3.scaleLinear()
        .domain([0, width])
        .range([0, width]);

    this.yAxisScale = d3.scaleLinear()
        .domain([0, height])
        .range([height, 0]);

    this.xAxis = d3.axisBottom()
        .scale(this.xAxisScale)
        .ticks(5);

    this.yAxis = d3.axisLeft()
        .scale(this.yAxisScale)
        .ticks(5);

    let zoom = d3.zoom()
        .scaleExtent([0.5, 5])
        .on("zoom", this.zoomFunction)

    this.innerSpace = svgViewport.append("g")
        .attr("class", "inner-space")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);

    this.innerSpace.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(this.xAxis);

    this.innerSpace.append("g")
        .attr("class", "y axis")
        .call(this.yAxis);
    let that = this;

    let circle = this.innerSpace.selectAll("circle")
        .data([originalCircle])
        .enter().append("circle")
        .attr("cx", function (d) { return that.xAxisScale(d.cx); })
        .attr("cy", function (d) { return that.yAxisScale(d.cy); })
        .attr("r", function (d) { return d.radius; })
        .style("fill", "red")

    d3.select("div").append("div").attr("id", "pan-x-div").text("Pan X translate: ");
    d3.select("div").append("div").attr("id", "pan-y-div").text("Pan Y translate: ");
    d3.select("div").append("div").attr("id", "v-scale").text("D3 Zoom Scale: ");


    d3.select("#pan-x-div").append("span").attr("id", "pan-x-span");
    d3.select("#pan-y-div").append("span").attr("id", "pan-y-span");
    d3.select("#v-scale").append("span").attr("id", "v-scale-val");
  },
  updated () {},
  methods:{
    zoomFunction () {
      let circles = d3.select("svg").selectAll("circle")
      .attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
        let panVector = d3.event
        let panX = panVector.transform.x;
        let panY = panVector.transform.y;
        let scaleMultiplier = panVector.transform.k;

        d3.select("#pan-x-span").text(panX);
        d3.select("#pan-y-span").text(panY);
        d3.select("#v-scale-val").text(scaleMultiplier);

        this.innerSpace.select(".x.axis").call(this.xAxis.scale(d3.event.transform.rescaleX(this.xAxisScale)));
        this.innerSpace.select(".y.axis").call(this.yAxis.scale(d3.event.transform.rescaleY(this.yAxisScale)));

        let that = this;

        circles
          .attr("cx", function (d, i) { return that.xAxisScale(d.cx); })
          .attr("cy", function (d, i) { return that.yAxisScale(d.cy); })
          .attr("r", function (d, i) { return (d.radius * scaleMultiplier); })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../styles/app.styl"

</style>
