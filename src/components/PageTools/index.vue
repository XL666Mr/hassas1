<template>
  <div>
    <el-card class="box-card">
      <!-- 1.开启flex布局 第二个靠右 2.第二个盒子开启flex布局 主轴从后面开始 3.slot站位-->
      <el-row type="flex">
        <el-col>
          <el-tag v-if="isShowLeft">
            <i :class="leftIcon"></i> <slot name="left-tag" />
          </el-tag>
        </el-col>

        <el-col>
          <el-row type="flex" justify="end"> <slot name="right" /> </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'PageTools',
  props: {
    leftIcon: {
      type: String,
      default: 'el-icon-info'
    },
    isShowLeft: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },

  created() {},

  methods: {}
}
</script>

<style scoped></style>
