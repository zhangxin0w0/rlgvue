<template>
  <div id="app">
    <!--头部搜索栏，固定，可以搜索商品，跳转到商品详情页面-->
    <van-sticky>
      <van-search
        label="商品名称"
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        background="#C82519"
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch" style="color: white">搜索</div>
      </van-search>
    </van-sticky>

    <keep-alive>
      <router-view/>
    </keep-alive>

    <!--底部导航栏-->
    <van-tabbar v-model="active" class="vbbg">
      <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/login">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/mycenter">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        value: '',
        active: 0
      };
    },
    methods: {
      onSearch() {

      }
    }
  };
</script>

<style lang="scss">

</style>
