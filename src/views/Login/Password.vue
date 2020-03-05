<template>
    <div class="password">
        <LoginHeader>
            <el-form slot="container" :rules="rules" :model="ruleForm" ref="ruleFrom" label-position="left"
                     label-width="0px">
                <div class="title">
                    <h3>找回密码</h3>
                </div>

                <!-- 账号 -->
                <el-form-item prop="username">
                    <el-input type="text" placeholder="账号：" auto-complete="off" v-model="ruleForm.username">
                        <i slot="prefix" class="fa fa-user-o"></i>
                    </el-input>
                </el-form-item>

                <!-- 邮箱 -->
                <el-form-item prop="email">
                    <el-input type="text" placeholder="邮箱：" auto-complete="off" v-model="ruleForm.email">
                        <i slot="prefix" class="fa fa-envelope-o"></i>
                    </el-input>
                </el-form-item>

                <!-- 找回密码 -->
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" :loading="loading"
                               @click.native.prevent="handleSubmit">
                        找回密码
                    </el-button>
                </el-form-item>

            </el-form>
        </LoginHeader>
    </div>
</template>

<script lang="ts">

  import {Component, Vue, Provide} from 'vue-property-decorator';
  import LoginHeader from '@/views/Login/LoginHeader.vue';

  @Component({
    components: {
      LoginHeader
    }
  })
  export default class Password extends Vue {
    @Provide() loading: Boolean = false; //是否发起网络请求

    @Provide() ruleForm: {
      username: String,
      email: String
    } = {
      username: '',
      email: ''
    };

    @Provide() rules = {
      username: [
        {required: true, message: '请输入账号', trigger: 'blur'},
      ],
      email: [
        {required: true, message: '请输入邮箱', trigger: 'blur'},
        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'change'}
      ],
    };

    handleSubmit() {
      (this.$refs['ruleForm'] as any).validate((valid: boolean) => {
        if (valid) {
          this.loading = true;
          // 发请求
          (this as any).$axios.post('/api/users/findPwd', this.ruleForm)
            .then((res: any) => {
              this.loading = false;
              //请求成功提醒
              this.$message({
                message: res.data.msg,
                type: 'success'
              });
              this.$router.push('/login');
            })
            .catch((err: any) => {
              console.log(err);
              this.loading = false;
            });
        }
      });
    }

  };
</script>

<style lang="scss" scoped>
    .title {
        margin: 0 auto 40px auto;
        text-align: center;
        color: #505458;
    }

    i {
        font-size: 14px;
        margin-left: 8px;
    }
</style>