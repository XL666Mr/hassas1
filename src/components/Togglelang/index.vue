<template>
  <div>
    <el-dropdown @command="commandFn">
      <span class="el-dropdown-link">
        语言<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          :command="key"
          v-for="(value, key) in messages"
          :key="key"
          >{{ value.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { messages } from '@/i18n'
import Cookie from 'js-cookie'
console.log(messages)
export default {
  name: 'Togglelang',
  data() {
    return {
      messages
    }
  },

  created() {},

  methods: {
    commandFn(lang) {
      this.$root.$i18n.locale = lang
      this.$router.go(0)
      Cookie.set('lang', lang)
      this.$message.success('切换多语言成功')
    }
  },

  computed: {}
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
