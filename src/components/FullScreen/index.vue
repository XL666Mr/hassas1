<template>
  <div style="margin: 0 15px">
    <svg-icon
      className="fullscreen"
      iconClass="fullscreen"
      @click="changeScreen"
    ></svg-icon>
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    //   改变全屏
    changeScreen() {
      if (!ScreenFull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      // document.documentElement.requestFullscreen()  原生js调用
      //   如果可用 就可以全屏
      ScreenFull.toggle()
    }
  },

  computed: {}
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
}
</style>
