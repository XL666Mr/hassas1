<template>
  <div>
    <el-dialog
      :title="title"
      :visible="visible"
      width="30%"
      :before-close="onClose"
    >
      <el-form
        ref="form"
        :model="formData"
        label-width="100px"
        :rules="formRules"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input
            placeholder="输入部门名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input
            placeholder="输入部门编码"
            v-model="formData.code"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select
            placeholder="请选择负责人"
            v-model="formData.manager"
            style="width: 100%"
          >
            <el-option
              :label="item.username"
              :value="item.username"
              v-for="item in employees"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            type="textarea"
            placeholder="部门介绍"
            v-model="formData.introduce"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDeptsApi,
  addDepartment,
  getDepartment,
  editDepartment
} from '@/api/departments'
import { getEmployees } from '@/api/employees'

export default {
  data() {
    // 部门名称
    const checkName = async (rule, value, callback) => {
      if (this.formData.id) {
        const { depts } = await getDeptsApi()
        console.log(depts)
        const filtersDepts = depts.filter((item) => {
          return item.pid === this.formData.pid && item.id !== this.formData.id
        })
        console.log(filtersDepts)
        const isRpeact = filtersDepts.some((item) => item.name === value)
        isRpeact ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.currentNode.children) return callback()
        const isRpeact = this.currentNode.children.some((ele) => {
          ele.name === value
        })
        isRpeact ? callback(new Error('部门重复')) : callback()
      }
    }

    // 部门编码
    const checkCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      let isRpeact
      if (this.formData.id) {
        isRpeact = depts
          .filter((item) => item.id !== this.formData.id)
          .some((ele) => ele.code === value)
      } else {
        isRpeact = depts.some((ele) => ele.code === value)
      }
      isRpeact ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: checkCode,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      },
      employees: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentNode: {
      type: Object,
      required: true
    }
  },

  created() {
    this.getEmployees()
  },

  methods: {
    async getEmployees() {
      const res = await getEmployees()
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentNode.id
      try {
        if (this.formData.id) {
          await editDepartment(this.formData)
          this.$message.success('编辑成功')
          this.onClose()
          this.$emit('addSuccess')
        } else {
          await addDepartment(this.formData)
          this.$message.success('添加成功')
          this.onClose()
          this.$emit('addSuccess')
        }
      } catch (error) {
        this.$message.error('操作部门失败')
      }
    },
    async getDeptById(id) {
      this.formData = await getDepartment(id)
    }
  },

  computed: {
    title() {
      return this.formData.id ? '编辑部门' : '添加部门'
    }
  }
}
</script>

<style scoped></style>
