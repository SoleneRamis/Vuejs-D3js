<template>
  <div class="axes">
    <div class="container">
      <h1> Axes </h1>
      <br>
      <br>
      <svg>
        <g class="graph-x">
          <text x="50" y="280">2017</text>
          <text x="100" y="280">2018</text>
          <text x="150" y="280">2019</text>
          <text x="200" y="280">2020</text>
          <text x="250" y="280">2021</text>
          <text x="300" y="280">2022</text>
          <text x="350" y="280">2023</text>
          <text x="400" y="280">2024</text>
        </g>
        <g class="graph-y">
          <text x="35" y="250">0</text>
          <text x="35" y="200">100</text>
          <text x="35" y="150">200</text>
          <text x="35" y="100">300</text>
          <text x="35" y="50">400</text>
        </g>

        <path class="graph-axes" d="M 50 0 L 50 250 L 450 250"/>

        <path class="graph-lines" d="M 100 0 L 100 250 L 450 250"/>
        <path class="graph-lines" d="M 150 0 L 150 250 L 450 250"/>
        <path class="graph-lines" d="M 200 0 L 200 250 L 450 250"/>
        <path class="graph-lines" d="M 250 0 L 250 250 L 450 250"/>
        <path class="graph-lines" d="M 300 0 L 300 250 L 450 250"/>
        <path class="graph-lines" d="M 350 0 L 350 250 L 450 250"/>
        <path class="graph-lines" d="M 400 0 L 400 250 L 450 250"/>

        <path class="graph-lines" d="M 50 0 L 50 200 L 450 200"/>
        <path class="graph-lines" d="M 50 0 L 50 150 L 450 150"/>
        <path class="graph-lines" d="M 50 0 L 50 100 L 450 100"/>
        <path class="graph-lines" d="M 50 0 L 50 50 L 450 50"/>
      </svg>
  </div>
  </div>
</template>

<script>
export default {
  name: 'axes',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  svg {
    width: 500px;
    height: 500px;
  }
  .graph-rect {
    stroke: black;
    stroke-width: 1px;
    fill: transparent;
  }
  .graph-x {
    text-anchor: middle;
  }
  .graph-y {
    text-anchor: end;
  }
  .graph-axes {
    fill: transparent;
    stroke-width: 2px;
    stroke: black;
  }
  .graph-lines {
    fill: transparent;
    stroke-width: 0.2px;
    stroke: black;
  }
</style>
