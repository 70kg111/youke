<template>
    <el-dialog title="编辑课程" :visible.sync="dialogVisible">
        <el-form ref="ruleForm" :model="formData" label-width="100px" size="small" class="form-box">
            <el-form-item label="课程名称" prop="title">
                <el-input v-model="formData.title" placeholder="请输入课程名称"></el-input>
            </el-form-item>

            <el-form-item label="课程等级" prop="level">
                <el-select v-model="formData.level" placeholder="请选择课程等级">
                    <el-option label="初级" value="初级"></el-option>
                    <el-option label="中级" value="中级"></el-option>
                    <el-option label="高级" value="高级"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="报名人数" prop="count">
                <el-input v-model="formData.count" placeholder="请输入报名人数"></el-input>
            </el-form-item>

            <el-form-item label="上线时间" prop="date">
                <el-date-picker type="date" placeholder="请选择日期" v-model="formData.date" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="技术栈" prop="type">
                <el-radio-group v-model="formData.type">
                    <el-radio label="Vue" name="type"></el-radio>
                    <el-radio label="React" name="type"></el-radio>
                    <el-radio label="Node" name="type"></el-radio>
                    <el-radio label="小程序" name="type"></el-radio>
                    <el-radio label="Angular" name="type"></el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button size="small">取消</el-button>
            <el-button type="primary" size="small">确定</el-button>
        </span>

    </el-dialog>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Provide} from 'vue-property-decorator';

  @Component({
    components: {}
  })
  export default class EditDialog extends Vue {
    @Prop(Boolean) dialogVisible!: boolean;
    @Prop(Object) formData!: {
      title: string,
      type: string,
      level: string,
      count: string,
      date: string,
    };

    created() {
      console.log(this.dialogVisible, this.formData);
    }
  };
</script>

<style lang="scss" scoped>
    .form-box {
        .el-input,
        .el-select {
            width: 200px !important;
        }
    }
</style>