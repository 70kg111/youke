<template>
    <div class="layout">
        <!-- 导航 -->
        <LayoutHeader></LayoutHeader>
        <!-- 内容 -->
        <Content>
            <Sidebar slot="left"></Sidebar>
            <router-view slot="content"></router-view>
        </Content>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import LayoutHeader from '@/views/Layout/LayoutHeader.vue';
  import Content from '@/views/Layout/Content.vue';
  import Sidebar from '@/views/Layout/Sidebar.vue';

  @Component({
    components:{Sidebar, Content, LayoutHeader}
  })
  export default class Layout extends Vue{

  };
</script>

<style lang="scss" scoped>
    .layout {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background: #f5f7f9;
    }
</style>