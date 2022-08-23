<template>
  <div>
    <el-row justify="end" type="flex">
      <el-col :span="5">
        <el-select
          v-model="currentYear"
          placeholder="请选择"
          @change="updateCalendar"
        >
          <el-option
            v-for="item in Years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="currentMonth"
          placeholder="请选择"
          @change="updateCalendar"
        >
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isRest(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      currentMonth: '',
      currentDate: '',
      Years: []
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.Years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, index) => item + index)
    },
    isRest(date) {
      return date.getDay() === 0 || date.getDay() === 6
    },
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  },

  computed: {}
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: 0;
  }
}
.cell-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50px;
}
.rest {
  display: block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: rgb(119, 117, 224);
  border-radius: 50%;
}
</style>
