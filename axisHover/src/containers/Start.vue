<template>
  <div class="start" v-if="!getLoaderDisplayerState">
    <h2>Axis Hover</h2>
    <transition name="fade" mode="out-in" appear>
      <div class="container">
        <hover-courbe></hover-courbe>
        <hover-bar></hover-bar>
      </div>
    </transition>
  </div>
</template>

<script>
import hoverCourbe from '../components/hoverCourbe';
import hoverBar from '../components/hoverBar';

import { mapGetters } from 'vuex';

export default {
  name: 'start',
  components: {
    hoverCourbe,
    hoverBar
  },
  data () {
    return {}
  },
  watch: {},
  computed: {
    ...mapGetters(['getLoaderDisplayerState'])
  },
  created () {},
	mounted () {},
  updated () {},
  methods:{}
}
</script>

<style>
  .container {
  display : flex;
  justify-content: center;
}
h2 {
  margin-right: 35%;
}
</style>
