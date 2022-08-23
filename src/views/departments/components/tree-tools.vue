<template>
  <el-row type="flex" style="width: 100%">
    <el-col>{{ treeNode.name }}</el-col>
    <el-col :span="6">
      <el-row type="flex">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col
          ><el-dropdown>
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$emit('add',treeNode)">添加部门</el-dropdown-item>
              <template v-if="!isRoot">
                <el-dropdown-item @click.native="$emit('edit',treeNode)">编辑部门</el-dropdown-item>
                <el-dropdown-item @click.native="onRemove"
                  >删除部门</el-dropdown-item
                >
              </template>
            </el-dropdown-menu>
          </el-dropdown></el-col
        >
      </el-row></el-col
    >
  </el-row>
</template>

<script>
import {delDeptsApi} from '@/api/departments'
export default {
  data() {
    return {}
  },
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },

  created() {},

  methods: {
    async onRemove() {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delDeptsApi(this.treeNode.id)
        this.$message.success('删除成功')
        this.$emit('remove')
        // console.log(this.treeNode.id)
      } catch (error) {}
    }
  },

  computed: {}
}
</script>

<style scoped></style>
