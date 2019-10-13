<template>
  <div class="home">
    <!--导航栏-->
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      right-text="注册新用户"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!--用户名-->
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('请输入用户名')"
      />
      <!--密码-->
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <!--登录按钮-->
      <van-button type="primary" size="large" @click="tz">用户登录</van-button>
    </van-cell-group>

    <van-divider>这是分割线</van-divider>

    <van-image
      width="3rem"
      height="3rem"
      :src="qq"
    />
    <van-image
      width="3rem"
      height="3rem"
      :src="qq"
    />
  </div>
</template>

<script>
  import axios from 'axios';
  import qq from '@/assets/QQ.png';
  import store from '@/store';

  export default {
    name: 'home',
    store,
    data() {
      return {
        username: '',
        password: '',
        datauser: '',
        qq: qq,
        num: store.state.count
      };
    },
    methods: {
      tz() {
        // 保存当前对象
        var this_ = this;

        // 封装前端传递给后端的数据
        var params = new URLSearchParams();
        params.append('username', this.username);
        params.append('password', this.password);

        // 执行请求获取后端数据
        axios.post('/portal/user/login.do', params)
          .then(function (datas) {
            console.log(datas);

            //获取状态码
            var status = datas.data.status;

            if (status !== 200) {
              // 弹出错误信息
              this_.$dialog.alert({
                message: datas.data.msg
              });
            } else {
              // 全局保存当前登录用户信息
              store.state.users = datas.data.data;
              // 获取后台数据
              this_.datauser = datas.data.data;
              // 登录成功跳转到首页
              this_.$router.push({
                path: '/',
                query: { da: this_.datauser }
              });
            }


          });
      },
      onClickLeft() {
        this.$router.go(-1);//返回上一层
      },
      onClickRight() {
        this.$router.push({
          path: '/register'
        });
      }
    },
  };
</script>

<style scoped>

</style>
