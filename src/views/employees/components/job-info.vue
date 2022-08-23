<template>
  <div>
    <i
      @click="$router.push(`/employees/print/${userId}?type=personal`)"
      class="el-icon-printer"
    ></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: this.$route.params.id
    }
  },

  created() {},

  methods: {},

  computed: {}
}
</script>

<style scoped></style>
