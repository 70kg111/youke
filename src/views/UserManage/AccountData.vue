<template>
    <div class="account-data">
        <div class="add-box">
            <el-button type="primary" @click="addAccount">新增账户</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;">

            <el-table-column label="角色" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.role}}</span>
                </template>
            </el-table-column>

            <el-table-column label="账号" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.username}}</span>
                </template>
            </el-table-column>

            <el-table-column label="描述" prop="des"></el-table-column>

            <el-table-column label="操作" width="180">
                <template slot-scope="scope" v-if="scope.row.username != 'admin'">
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <AddAccount @update="getData" @closeDialog="closeDialog" :dialogVisible="dialogVisible"
                    :options="options"></AddAccount>
    </div>
</template>

<script lang="ts">
  import {Component, Vue, Provide} from 'vue-property-decorator';
  import AddAccount from '@/views/UserManage/AddAccount.vue';

  @Component({
    components: {AddAccount}
  })
  export default class AccountData extends Vue {

    @Provide() tableData: any = [];
    @Provide() dialogVisible: boolean = false;
    //select数据
    @Provide() options: any = [
      {
        key: 'admin',
        role: '管理员',
        des: 'Super Administrator. Have access to view all pages.'
      },
      {
        key: 'editor',
        role: '客服',
        des: 'Normal Editor. Can see all pages except permission page.'
      },
      {
        key: 'visitor',
        role: '游客',
        des: 'Just a visitor. Can only see the home page and the document page'
      },
    ];

    closeDialog() {
      this.dialogVisible = false;
    }

    addAccount() {
      this.dialogVisible = true;
    }

    created() {
      this.getData();
    }

    getData() {
      (this as any).$axios('api/users/allUsers')
        .then((res: any) => {
          this.tableData = res.data.datas;
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };
</script>

<style lang="scss" scoped>
    .account-data {
        height: 100%;
        overflow: auto;

        .add-box {
            margin-bottom: 10px;
        }
    }
</style>