<template>
    <div>
      <!--轮播图-->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" id="sw-img"/>
        </van-swipe-item>
      </van-swipe>

      <!--功能栏-->
      <van-grid :gutter="10">
        <van-grid-item
          v-for="(value,index) in icons"
          :key="index"
          :icon="value.image"
          :text="value.text"
        />
      </van-grid>

      <!--秒杀活动-->
      <!--推荐商品-->
      <van-row>
        <van-col span="12">
          <van-panel>
            <van-image
              width="100"
              height="100"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <p>小猫</p>
            <div>内容</div>
          </van-panel>
        </van-col>
        <van-col span="12">
          <van-panel>
            <van-image
              width="100"
              height="100"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <p>商品名称：{{productList.name}}</p>
            <p>商品价格：{{productList.price}}</p>
            <div>内容</div>
          </van-panel>
        </van-col>
      </van-row>

    </div>
</template>

<script>
  import store from '@/store';
  import axios from 'axios';
  import b1 from '@/assets/banner/1.jpg'
  import b2 from '@/assets/banner/2.jpg'
  import b3 from '@/assets/banner/3.jpg'

  export default {
    name: 'Home',
    store,
    data(){
      return{
        images: [
          b1,b2,b3
        ],
        icons:[
          {text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg'},
          {text:'服装',image:'https://img.yzcdn.cn/vant/cat.jpeg'},
          {text:'电器',image:'https://img.yzcdn.cn/vant/cat.jpeg'},
          {text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg'},
          {text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg'},
          {text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg'},
          {text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg'},
          {text:'生鲜',image:'https://img.yzcdn.cn/vant/cat.jpeg'}
        ],
        users:store.state.users,
        productList:''
      }
    },
    methods:{
      getProducts(){
        // 保存当前对象
        var this_ = this;

        // 封装前端传递给后端的数据
        var params = new URLSearchParams();
        params.append('productId', 10000);

        axios.post('/portal/product/detail.do', params)
          .then(function (datas) {
            //获取状态码
            var status = datas.data.status;

            if (status !== 200) {
              // 弹出错误信息
              this_.$dialog.alert({
                message: datas.data.msg
              });
            } else {
              this_.productList=datas.data.data
            }
          });
      }
    },
    activated:function () {
      this.getProducts();
    }
  };
</script>

<style scoped>
#sw-img{
  height: 100%;
  width: 100%;
}
</style>
