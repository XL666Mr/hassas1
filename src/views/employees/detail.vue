<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录账户设置" name="first">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateUserInfo"
                  >更新</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <userInfo></userInfo
          ></el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">
            <jobInfo></jobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { setTokenActive, getTokenActive } from '@/utils/auth'
import { getOtherInfo, updateUserInfo } from '@/api/user'
import userInfo from './components/user-info'
import jobInfo from './components/job-info.vue'
export default {
  data() {
    return {
      formData: {},
      activeName: getTokenActive() || 'first'
    }
  },

  created() {
    this.getOtherInfo()
  },

  methods: {
    async getOtherInfo() {
      const res = await getOtherInfo(this.$route.params.id)
      this.formData = res
    },
    async updateUserInfo() {
      await updateUserInfo(this.formData)
      this.$message.success('ok')
      this.getOtherInfo()
    },
    handleClick(tab) {
      console.log(tab.label)
      setTokenActive(tab.name)
    }
  },

  computed: {},
  components: {
    userInfo,
    jobInfo
  }
}
</script>

<style scoped></style>
