<template>
  <div class="detail-swiper">
    <swiper class="swiperst">
      <swiper-item v-for="item in topImages" >
        <img :src="item" alt="">
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
  import {Swiper , SwiperItem} from 'components/common/swiper'
  export default {
    name :'DetailSwiper',
    props:{
      topImages : {
        type: Array,
        default (){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .swiperst{
    height: 300px;
    overflow: hidden;
  }
</style>
