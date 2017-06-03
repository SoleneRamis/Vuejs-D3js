<template>
  <div class="start" v-if="!getLoaderDisplayerState">
    <transition name="fade" mode="out-in" appear>
      <div>
        <h2>Graphic Area</h2>
        <test-area></test-area>
        <points-hover></points-hover>
      </div>
    </transition>
  </div>
</template>

<script>
import testArea from '../components/testArea';
import pointsHover from '../components/pointsHover';

import { mapGetters } from 'vuex';

export default {
  name: 'start',
  components: {
    testArea,
    pointsHover
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

<style lang="stylus">
@import "../styles/app.styl"

  .start
    margin-top -2%

</style>
