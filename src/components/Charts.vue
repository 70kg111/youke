<template>
    <div class="chart" :style="{width:chartWidth,height:chartHeight}">

    </div>
</template>

<script lang="ts">
  import {Component, Prop, Provide, Vue} from 'vue-property-decorator';
  import echarts from 'echarts';

  @Component({
    components: {}
  })
  export default class Charts extends Vue {
    //图标类型 line/bar/pie
    @Prop({type: String, default: 'line'}) readonly chartType !: string;
    @Prop(Object) chartData !: string | null;

    @Provide() chartWidth: string = '';
    @Provide() chartHeight: string = '';

    created() {
      this.generatorWidthAndHeight();
    }

    //图表的宽度和高度
    generatorWidthAndHeight() {
      this.chartWidth = `${document.body.offsetWidth * 0.8}px`;
      this.chartHeight = `${document.body.offsetHeight * 0.6}px`;
    }
  };
</script>


<style lang="scss" scoped>

</style>