<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :isShowLeft="false">
        <el-button
          type="primary"
          slot="right"
          size="small"
          @click="showDialogFn('0', 1)"
          >添加权限</el-button
        >
      </PageTools>
      <el-table
        :data="permission"
        style="width: 100%; margin-top: 20px"
        border
        row-key="id"
        ref="table"
      >
        <el-table-column label="名称" width="180">
          <template v-slot="{ row }">
            <i
              v-if="row.children"
              class="el-icon-folder-opened"
              @click="expend(row)"
            ></i>
            <i
              v-if="row.type === 2"
              class="el-icon-folder"
              @click="expend(row)"
            ></i>
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text" @click="showDialogFn(row.pid, 2)"
              >添加</el-button
            >
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog
        :title="`权限点`"
        :visible.sync="showDialog"
        @close="btnCancel"
      >
        <!-- 表单 -->
        <el-form
          ref="perForm"
          :model="formData"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width: 90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width: 90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK"
              >确定</el-button
            >
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermissionList, addPermission } from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      permission: [],
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: ''
      },
      rules: {
        name: [{ required: true, message: '不能为空', trigger: blur }],
        code: [{ required: true, message: '不能为空', trigger: blur }]
      },
      showDialog: false
    }
  },

  created() {
    this.getPermissionList()
  },

  methods: {
    async getPermissionList() {
      const res = await getPermissionList()
      this.permission = transListToTree(res, '0')
    },
    expend(row) {
      row.isExpanded = !row.isExpanded
      this.$refs.table.toggleRowExpansion(row, row.isExpanded)
    },
    showDialogFn(id, type) {
      this.showDialog = true
      this.formData.pid = id
      this.formData.type = type
    },
    btnOK() {
      this.$refs.perForm.validate(async (valid) => {
        if (!valid) return
        await addPermission(this.formData)
        this.$message.success('添加成功')
        this.showDialog = false
        this.getPermissionList()
      })
    },
    btnCancel() {
      this.showDialog = false
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
