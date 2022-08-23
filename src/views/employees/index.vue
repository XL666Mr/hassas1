<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="importFn"
            v-isHas="isHas(point.employees.import)"
            >导入</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="exportFn"
            v-if="isHas(point.employees.export)"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="dialogVisible = true"
            v-if="isHas(point.employees.add)"
            >新增员工</el-button
          >
        </template>
      </PageTools>

      <!-- 放置表格和分页 -->

      <el-card>
        <el-table :data="EmployeesInfoList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="头像">
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                v-imgError="require('@/assets/common/dog.jpg')"
                style="height: 80px; width: 80px; border-radius: 50%"
                @click="showErCodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />

          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatForm"
            prop="formOfEmployment"
          />

          <el-table-column label="部门" sortable="" prop="departmentName" />

          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template></el-table-column
          >
          <el-table-column label="状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button
                type="text"
                size="small"
                @click="getEmployeesFn(row.id)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="delEmployeesFn(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->

        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :total="total"
            :page-size="pages.size"
            @current-change="currentChange"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
    </div>
    <Addemloyees :dialogVisible.sync="dialogVisible"></Addemloyees>
    <el-dialog title="头像信息" :visible="ercodeDialog">
      <canvas id="canvas"></canvas>
    </el-dialog>
    <assignRole :visible.sync="visible" :employeesId="employeesId"></assignRole>
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployees } from '@/api/employees'
import employees from '@/constant/employees'
import Addemloyees from './components/add-emloyees'
import assignRole from './components/assign-role.vue'
import mixinPermission from '@/mixins/permission'
import QRcode from 'qrcode'
const { exportMapKeyPath, hireType } = employees
export default {
  props: {
    path: ['path']
  },
  mixins: [mixinPermission],
  data() {
    return {
      EmployeesInfoList: [],
      pages: {
        page: 1,
        size: 10
      },
      total: 0,
      dialogVisible: false,
      ercodeDialog: false,
      visible: false,
      employeesId: ''
    }
  },

  created() {
    this.getEmployeesInfoApi()
    console.log(this.path)
  },

  methods: {
    getEmployeesFn(id) {
      this.employeesId = id
      this.visible = true
    },
    close() {
      this.dialogVisible = false
    },
    async getEmployeesInfoApi() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.EmployeesInfoList = rows
      this.total = total
    },
    currentChange(val) {
      this.pages.page = val
      this.getEmployeesInfoApi()
    },
    formatForm(row, column, cellValue, index) {
      const findItem = employees.hireType.find((ele) => ele.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async delEmployeesFn(id) {
      await this.$confirm('是否确定删除？')
      const res = await delEmployees(id)
      this.$message.success('删除成功！！')
      this.getEmployeesInfoApi()
    },
    importFn() {
      this.$router.push('/import')
    },
    async exportFn() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeesInfoApi({ page: 1, size: this.total })
      const header = Object.keys(exportMapKeyPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((ele) => {
              ele.id === item[exportMapKeyPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportMapKeyPath[h]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: 'excel-list', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx' //非必填
      })
    },
    showErCodeDialog(staffPhoto) {
      if (!staffPhoto) return this.$message.error('该用户还未设置头像')
      this.ercodeDialog = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, staffPhoto)
      })
    }
  },
  components: {
    Addemloyees,
    assignRole
  }
}
</script>

<style scoped lang="less"></style>
