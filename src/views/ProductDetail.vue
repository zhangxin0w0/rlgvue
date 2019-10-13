<template>
  <div class="goods">
    <top-back :content="title"></top-back>
    <!--商品图片轮播图-->
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="(srchost,index) in good.subImages" :key="index">
        <img :src="srchost">
      </van-swipe-item>
    </van-swipe>

    <!--商品信息-->
    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ good.subtitle }}</div>
        <div class="goods-price">¥{{ good.price }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：免运费</van-col>
        <van-col span="14">剩余：{{ good.stock }}</van-col>
      </van-cell>
    </van-cell-group>

    <!--商品详情-->
    <van-panel>
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
        商品详情
      </van-divider>
      <van-image
        width="100%"
        height="10rem"
        fit="contain"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <p>{{good.detail}}</p>
    </van-panel>

    <!--加入购物车-->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :show-add-cart-btn="false"
      buy-text="确定"
      @buy-clicked="addOne"
    />


    <!--购买-->
    <van-goods-action id="vga">
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" to="/cart" :info="num">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="onClickCart">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="onClickBuy">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
  import axios from 'axios';
  import TopBack from '@/components/TopBack.vue'

  export default {
    name: 'ProductDetail',
    components:{
      TopBack
    },
    data() {
      return {
        title:'商品详情',
        good: '',
        thum: '',
        num:0,
        show: false,
        sku: {
          price: '1.00',
          stock_num: 100,
          none_sku: false,
          hide_stock: false,
          collection_id: 2261,
          tree: [
            {
              k: '颜色',
              k_id: '1',
              v: [
                {
                  id: '30349',
                  name: '天蓝色',
                  imgUrl:
                    'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'
                },
                {
                  id: '1215',
                  name: '白色'
                }
              ],
              k_s: 's1',
              count: 2
            },
            {
              k: '尺寸',
              k_id: '2',
              v: [
                {
                  id: '1193',
                  name: '1'
                },
                {
                  id: '1194',
                  name: '2'
                }
              ],
              k_s: 's2',
              count: 2
            }
          ],
          list: [
            {
              id: 2259,
              price: 100,
              discount: 100,
              code: '',
              s1: '1215',
              s2: '1193',
              s3: '0',
              s4: '0',
              s5: '0',
              stock_num: 110,
              goods_id: 946755
            },
            {
              id: 2260,
              price: 100,
              discount: 100,
              code: '',
              s1: '1215',
              s2: '1194',
              s3: '0',
              s4: '0',
              s5: '0',
              stock_num: 0,
              goods_id: 946755
            },
            {
              id: 2257,
              price: 100,
              discount: 100,
              code: '',
              s1: '30349',
              s2: '1193',
              s3: '0',
              s4: '0',
              s5: '0',
              stock_num: 111,
              goods_id: 946755
            },
            {
              id: 2258,
              price: 100,
              discount: 100,
              code: '',
              s1: '30349',
              s2: '1194',
              s3: '0',
              s4: '0',
              s5: '0',
              stock_num: 6,
              goods_id: 946755
            }
          ],
        },
        goodsId:1000,
        goods: {
          // 商品标题
          title: '测试商品',
          // 默认商品 sku 缩略图
          picture: 'https://img.yzcdn.cn/upload_files/2017/03/16/Fs_OMbSFPa183sBwvG_94llUYiLa.jpeg?imageView2/2/w/100/h/100/q/75/format/jpg'
        }
      };
    },
    methods: {
      // 获取商品详情
      getProductsDetil() {
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
              this_.good = datas.data.data;
            }
          });
      },
      // 获取购物车中商品数量
      getCartNum() {
        // 保存当前对象
        var this_ = this;

        axios.post('/portal/cart/get_cart_product_count.do')
          .then(function (datas) {
            //获取状态码
            var status = datas.data.status;
            // 成功后重新赋值
            if (status === 200) {
              this_.num=datas.data.data
            }
          });
      },
      // 商品加入购物车
      onClickCart() {
        console.log("ok")
        this.show=true
      },
      // 立刻购买，跳转到购物车界面
      onClickBuy() {

      },
      // 进入购物车页面
      toCart() {

      },
      // 呼叫客服
      sorry() {
        this.$dialog.alert({
          message: '有问题请拨打4000000'
        });
      },
      addOne(){
        this.$toast.success('加入成功');
        this.show=false
      }

    },
    // 组件加载就执行的方法
    activated: function () {
      this.getProductsDetil();
      this.getCartNum();
    }
  };
</script>

<style scoped lang="less">
  #vga {
    bottom: 50px !important;
  }

  .goods {
    margin-bottom: 150px;
    &-swipe {
      img {
        width: 100%;
        display: block;
      }
    }
    &-title {
      font-size: 16px;
    }
    &-price {
      color: #f44;
    }
    &-express {
      color: #999;
      font-size: 12px;
      padding: 5px 15px;
    }
    &-cell-group {
      margin: 15px 0;
      .van-cell__value {
        color: #999;
      }
    }
    &-tag {
      margin-left: 5px;
    }
  }
</style>
