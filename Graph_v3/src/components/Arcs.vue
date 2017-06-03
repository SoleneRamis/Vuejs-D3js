<template>
  <div class="arcs">
    <h1>{{ msg }}</h1>
    <br>
  </div>
</template>

<script>
import * as d3 from 'd3'

let data = [80, 65, 50, 30, 10, 5]
let radius = 200

export default {
  name: 'arcs',
  data () {
    return {
      msg: 'Graphics Donut & Circle'
    }
  },
  mounted () {
    let color = d3.scaleOrdinal()
    .range(['lightgreen', 'purple', 'gray', 'pink', 'lightblue', 'orange'])

    let canvas = d3.selectAll('div').append('svg')
    .attr('width', 1500)
    .attr('height', 700)

    let group = canvas.append('g')

    let pie = d3.pie()
    .value(function (d) { return d })

    let arcDonut = d3.arc()
    .innerRadius(100)
    .outerRadius(radius)

    let arcsD = group.selectAll('arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arcDonut')
    .attr('transform', 'translate(350, 250)')
    arcsD.append('path')
    .attr('d', arcDonut)
    .attr('fill', function (d) { return color(d.data) })
    .transition()
    .duration(1500)
    .attrTween('d', function (d) {
      let start = {startAngle: 0, endAngle: 0}
      let interpolate = d3.interpolate(start, d)
      return function (t) { return arcDonut(interpolate(t)) }
    })
    arcsD.append('text')
    .style('fill-opacity', 0)
    .transition()
    .duration(3500)
    .style('fill-opacity', 1)
    .attr('transform', function (d) { return 'translate(' + arcDonut.centroid(d) + ')' })
    .attr('text-anchor', 'middle')
    .attr('fonct-size', '1.5')
    .text(function (d) { return d.data })

    let arcCircle = d3.arc()
    .innerRadius(0)
    .outerRadius(radius)

    let arcsC = group.selectAll('arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arcCircle')
    .attr('transform', 'translate(1000, 250)')
    arcsC.append('path')
    .attr('d', arcCircle)
    .attr('fill', function (d) { return color(d.data) })
    .transition()
    .duration(1500)
    .attrTween('d', function (d) {
      let start = {startAngle: 0, endAngle: 0}
      let interpolate = d3.interpolate(start, d)
      return function (t) { return arcCircle(interpolate(t)) }
    })
    arcsC.append('text')
    .style('fill-opacity', 0)
    .transition()
    .duration(3500)
    .style('fill-opacity', 1)
    .attr('transform', function (d) { return 'translate(' + arcCircle.centroid(d) + ')' })
    .attr('text-anchor', 'middle')
    .attr('fonct-size', '1.5')
    .text(function (d) { return d.data })
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
}
</style>
