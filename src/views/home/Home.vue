<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
     <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home.js"

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop:0,
        isTabFixed:false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted() {

    },
    methods: {
      //事件监听
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position) {
        //判断backTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        //决定tabControl 的吸顶
        this.isTabFixed = (-position.y)>this.tabOffsetTop
      },
      backClick() {
        /* 组件 ref 之间访问他的 属性方法*/
        this.$refs.scroll.scrollTo(0, 0)
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad (){
        //获取  tabControl的offsetTop
        //所有的一个组件都有一个属性$el 用于获取一个组件的元素
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      // 网络请求相关的
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

 .tab-control {
     position: relative;
    z-index: 9;
  }

  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
  .content {
    /* height: 300px; */
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }


</style>
