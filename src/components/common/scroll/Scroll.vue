<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name:'Scroll',
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        //实时监听
        probeType:this.probeType,
        //上拉
        pullUpLoad:this.pullUpLoad
      })
      // 监听滚动位置
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })
      // 监听上拉事件
      this.scroll.on('pullingUp',() => {
        this.$emit('pullingUp')
        })

    },
    data(){
      return{
        scroll:null
      }
    },
    methods:{
      scrollTo(x,y,time=300) {
        this.scroll.scrollTo(x,y,time)
      },
      //告诉 完成了一次 上拉 这样才可以第二次
      finishPullUp(){
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style>
</style>
