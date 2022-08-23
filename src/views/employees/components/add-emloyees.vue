<template>
  <div>
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="30%"
      @close="onClose"
    >
      <!-- 表单 -->
      <el-form label-width="120px" :rules="rules" :model="formData" ref="form">
        <el-form-item label="姓名" prop="username">
          <el-input
            style="width: 50%"
            placeholder="请输入姓名"
            v-model="formData.username"
          />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input
            v-model="formData.mobile"
            style="width: 50%"
            placeholder="请输入手机号"
          />
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            style="width: 50%"
            placeholder="请选择入职时间"
            v-model="formData.timeOfEntry"
          />
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select
            style="width: 50%"
            placeholder="请选择"
            v-model="formData.formOfEmployment"
          >
            <el-option
              v-for="item in hireType"
              :label="item.value"
              :value="item.id"
              :key="item.id"
            ></el-option
          ></el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input
            style="width: 50%"
            placeholder="请输入工号"
            v-model="formData.workNumber"
          />
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <!-- <el-input
            style="width: 50%"
            placeholder="请选择部门"
            v-model="formData.username"
          /> -->
          <el-select
            @focus="getDeptsFn"
            placeholder="请选择部门"
            v-model="formData.departmentName"
            ref="deptSelect"
          >
            <el-option value="" v-loading="isTreeLoading">
              <el-tree
                :data="depts"
                :props="treeProps"
                @node-click="treeNodeClick"
              ></el-tree> </el-option
          ></el-select>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            style="width: 50%"
            placeholder="请选择转正时间"
            v-model="formData.correctionTime"
          />
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
import { transListToTree } from '@/utils/index'
import { getDeptsApi } from '@/api/departments'
import { addEmployeesApi } from '@/api/employees'
import employees from '@/constant/employees'
export default {
  data() {
    return {
      hireType: employees.hireType,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      depts: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      treeProps: {
        label: 'name'
      },
      isTreeLoading: false
    }
  },

  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  created() {},

  methods: {
    onClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.form.resetFields()
    },
    async getDeptsFn() {
      this.isTreeLoading = true
      const { depts } = await getDeptsApi()
      transListToTree(depts, '')
      this.depts = depts
      this.isTreeLoading = false
    },
    treeNodeClick(row) {
      console.log(row.name)
      this.formData.departmentName = row.name
      this.$refs.deptSelect.blur()
    },
    onSave() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        await addEmployeesApi(this.formData)
        this.$parent.getEmployeesInfoApi()
        this.$emit('update:dialogVisible', false)
      })
    }
  },

  computed: {}
}
</script>

<style scoped lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
  overflow: unset;
}
.el-select-dropdown__item {
  height: 80px;
}
.treeOption {
  height: 100px;
}
</style>
