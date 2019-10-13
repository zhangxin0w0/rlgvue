<template>
  <div>
    <!--导航栏-->
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      right-text="登录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!--用户名-->
    <van-cell-group>
      <van-field
        v-model="username"
        autofocus="autofocus"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('请输入用户名')"
        @blur="unBlur"
      />
      <!--密码-->
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
      <van-field
        v-model="password2"
        type="password"
        label="再次输入密码"
        placeholder="请再次输入密码"
        required
      />
      <van-field
        v-model="question"
        required
        label="密保问题"
        placeholder="请输入问题"
      />
      <van-field
        v-model="answer"
        required
        label="密保答案"
        placeholder="请输入答案"
      />
      <!--注册按钮-->
      <van-button  type="primary" size="large" @click="zhuce">用户注册</van-button>
    </van-cell-group>

  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'register',
    data() {
      return {
        bol: true,
        username: '',
        password: '',
        password2: '',
        question:'',
        answer:'',
      };
    },
    methods: {
      zhuce() {
        var this_ = this;

        // 封装前端传递给后端的数据
        var params = new URLSearchParams();
        params.append('username', this.username);
        params.append('password', this.password);
        params.append('question', this.question);
        params.append('answer', this.answer);

        // 执行请求获取后端数据
        axios.post('/portal/user/register.do', params)
          .then(function (datas) {
            //获取状态码
            var status = datas.data.status;

            if (status !== 200) {
              // 弹出错误信息
              this_.$dialog.alert({
                message: datas.data.msg
              });
            } else {
              // 弹出成功信息
              this_.$dialog.alert({
                message: datas.data.msg
              });
              // 重置数据
              this_.username = '';
              this_.password = '';
              this_.password2 = '';
              this_.question = '';
              this_.answer = '';
              // 也可以让用户跳转回登录页面
              this_.$router.push({
                path: '/login'
              });
            }
          });
      },
      unBlur() {
        // 当用户输入用户名之后，鼠标焦点移开
        // 1.判断当前注册的用户名是否存在
        // 2.如果用户名存在就对用户提示，然后焦点重新定位到用户名输入框，并清空数据
        // 保存当前对象
        var this_ = this;

        // 封装前端传递给后端的数据
        var params = new URLSearchParams();
        params.append('str', this.username);
        params.append('type', 'username');

        if(this.username === '' || this.username === null){
          this_.$dialog.alert({
            message: '用户名不能为空'
          });
        }else{
          // 执行请求获取后端数据
          axios.post('/portal/user/check_valid.do', params)
            .then(function (datas) {
              //获取状态码
              var status = datas.data.status;

              if (status !== 200) {
                // 弹出错误信息
                this_.$dialog.alert({
                  message: '用户名已存在'
                });
                // 这里可以刷新的方式清空数据

              } else {
                // 弹出成功信息
                this_.$dialog.alert({
                  message: '用户名可以使用'
                });
              }
            });
        }



        // 3.判断两次输入的密码是否一样
        // 4.密保问题和答案内容不能为空或空字符串


      },
      onClickLeft() {
        this.$router.go(-1);//返回上一层
      },
      onClickRight() {
        this.$router.push({
          path: '/login'
        });
      }
    }
  };
</script>

<style scoped>

</style>
