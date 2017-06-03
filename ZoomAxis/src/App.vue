<template>
  <div class="app">
    <transition name="fade" appear>
      <loader v-show="getLoaderDisplayerState"></loader>
    </transition>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import throttle from 'lodash.throttle';
import _ from 'underscore';
import MobileDetect from 'mobile-detect';


import Loader from './components/Loader';

import { mapActions, mapGetters } from 'vuex';


export default {
  name: 'app',
  components: {
    Loader,
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['getLoaderDisplayerState'])
  },
  created () {
    this.resizer();
    this.mobileDetect();
  },
  mounted (){
  },
  methods:{
    ...mapActions(['setUpdateSizeState','setMobileState']),
     resizer () {
      var that = this;
      var throttled =  _.throttle(resized, 60, { 'trailing': false })
      var resize = window.addEventListener("resize", () => {
        throttled();
      });
       var resized = () => {
        that.setUpdateSizeState(true);
      }
    },
    mobileDetect () {
       var userAgent = window.navigator.userAgent
       var md = new MobileDetect(userAgent);
       if(md.mobile() != null){
         this.setMobileState(md);
       }
    }
  }
}
</script>

<style lang="stylus">
  html
    width 100%
    height 100%
    margin 0px
    padding 0px

  body
    width 100%
    height 100%
    margin 0px
    padding 0px

  #app
    width 100%
    height 100%
    margin 0px
    padding 0px

  .app
    width 100%
    height 100%
    margin 0px
    padding 0px

</style>
