<template>
  <div class="dashboard-container" v-loading="loading">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools
          :treeNode="company"
          :isRoot="true"
          @add="showAddDept"
        ></TreeTools>
        <!-- 主体 -->
        <el-tree :data="dataList" :props="defaultProps" default-expand-all>
          <template v-slot="scoped">
            <TreeTools
              :treeNode="scoped.data"
              @remove="getDeptsApi"
              @add="showAddDept"
              @edit="showEdit"
            ></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <AddDept
      ref="addDept"
      @addSuccess="addSuccess"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
    ></AddDept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDeptsApi } from '@/api/departments'
import { a } from '@/utils/index'
export default {
  data() {
    return {
      dataList: [
        {
          name: '总裁办',
          children: [
            {
              name: '二级 1-1'
            }
          ]
        },
        {
          name: '总裁办'
        },
        {
          name: '总裁办'
        }
      ],
      defaultProps: {
        label: 'name'
      },
      company: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      currentNode: {},
      loading: false
    }
  },

  created() {
    this.getDeptsApi()
  },

  methods: {
    async getDeptsApi() {
      this.loading = true
      const res = await getDeptsApi()
      this.dataList = a(res.depts, '')
       this.loading = false
    },
    showAddDept(val) {
      ;(this.dialogVisible = true), (this.currentNode = val)
    },
    addSuccess() {
      this.getDeptsApi()
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    }
  },
  components: {
    TreeTools,
    AddDept
  }
}
</script>

<style scoped lang="less"></style>
