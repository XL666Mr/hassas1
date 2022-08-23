<template>
  <div>
    <el-dialog
      title="分配角色"
      :visible="visible"
      @open="onOpen"
      @close="close"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox :label="item.id" v-for="item in roles" :key="item.id">
          {{ item.name }}</el-checkbox
        >
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="btnOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getOtherInfo, assignRoles } from '@/api/user'
export default {
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      Boolean,
      required: true
    },
    employeesId: ''
  },

  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    onOpen() {
      this.getRolesList()
      this.getEmployeesRoles()
    },
    async getRolesList() {
      const roles = await getRolesApi()
      this.roles = roles.rows
    },
    // 获取员工角色
    async getEmployeesRoles() {
      const { roleIds } = await getOtherInfo(this.employeesId)
      this.checkList = roleIds
    },
    async btnOK() {
      if (!this.checkList.length) return this.$message.error('请分配角色')
      await assignRoles({ id: this.employeesId, roleIds: this.checkList })
      this.$message.success('分配角色成功')
      //   关闭窗体
      this.close()
    }
  },

  computed: {}
}
</script>

<style scoped></style>
