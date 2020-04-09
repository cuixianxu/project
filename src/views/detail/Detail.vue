<template>
  <div id="detail" >
   <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
   <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
     <detail-swiper :top-images="topImages" />
     <detail-base-info :goods="goods" />
     <detail-shop-info :shop="shop" />
     <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
     <detail-param-info ref="params" :param-info="paramInfo" />
     <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
     <goods-list ref="recommend" :goods="recommends"></goods-list>
   </scroll>
    <detail-botton-bar @addCart="addToCart"></detail-botton-bar>
     <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
     <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
 import DetailNavBar from './childcomponents/DetailNavBar.vue'
 import DetailSwiper from './childcomponents/DetailSwiper.vue'
 import DetailBaseInfo from './childcomponents/DetailBaseInfo.vue'
 import DetailShopInfo from './childcomponents/DetailShopInfo.vue'
 import DetailGoodsInfo from './childcomponents/DetailGoodsInfo.vue'
 import DetailParamInfo from './childcomponents/DetailParamInfo.vue'
 import DetailCommentInfo from './childcomponents/DetailCommentInfo.vue'
 import DetailBottonBar from './childcomponents/DetailBottomBar.vue'
 // import DetailRecommendInfo from './childcomponents/DetailRecommendInfo.vue'
// import Toast from 'components/common/toast/Toast.vue'

import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

 import {getDetail ,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages:[],
        goods: {},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo: {},
        recommends:[],
        themeTopYs:[],
        currentIndex:0,
        isShowBackTop:false,
        message:'',
        show:false

      }
    },
    created(){
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        //获取顶部轮播数据
         const data =res.result
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns,data.shopInfo.services)
        //创建店铺信息
        this.shop = new Shop(data.shopInfo)
        //保存商品详情数据
        this.detailInfo = data.detailInfo;
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }


        // this.$nextTick(() =>{
        //   //根据新的数据 dom 渲染完了 但是图片还么有
        //   this.themeTopYs= []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs)
        // })
      }),
      getRecommend().then(res =>{
        // console.log(res)
        this.recommends = res.data.list
      })
    },mounted() {

    },updated() {
      this.imageLoad2();
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottonBar,
      Scroll,
      GoodsList,
      BackTop,
      // Toast
    },
    methods:{
      backClick() {
        /* 组件 ref 之间访问他的 属性方法*/
        this.$refs.scroll.scrollTo(0, 0)
      },
      imageLoad(){
        this.$refs.scroll.refresh()
          //根据新的数据 dom 渲染完了 但是图片还么有

      },
      imageLoad2(){
        this.themeTopYs= []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        this.themeTopYs.push(Number.MAX_VALUE)
        console.log(this.themeTopYs)
      },
      titleClick(index){
        // console.log(index)
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        const positionY = -position.y
        let length = this.themeTopYs.length
        for(let i=0 ; i<length-1;i++){
          // if(this.currentIndex !== i &&((i<length -1 && positionY > this.themeTopYs[i] &&
          // positionY< this.themeTopYs[i+1]) || (i === length-1 &&positionY > this.themeTopYs[i]))){
          //   this.currentIndex = i;
          //   console.log(this.currentIndex)
          //   this.$refs.nav.currentIndex= this.currentIndex
          // }
          if(this.currentIndex !== i&&(positionY> this.themeTopYs[i]) &&positionY<this.themeTopYs[i+1]){
              this.currentIndex = i;
            //   console.log(this.currentIndex)
              this.$refs.nav.currentIndex= this.currentIndex
          }
        }
        this.isShowBackTop = this.isShowBackTop = (-position.y) > 1000
      },
      addToCart(){
        //获取购物车需要展示的数据
        const product ={}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.nowPrice;
        product.iid = this.iid;
        //添加到购物车
        this.$store.dispatch('addCart',product).then(res => {
          // console.log(res)
          // this.show =true
          // this.message = res
          // setTimeout(()=>{
          //   this.show = false
          //   this.message = ''
          // },1500)
          this.$toast.show(res,1500)
        })

      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px);
  }
  .detail-nav{
    position:  relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
