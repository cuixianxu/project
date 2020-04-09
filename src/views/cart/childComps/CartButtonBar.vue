<template>
  <div class="button-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkbutton/CheckButton.vue'
  export default {
    name:'CartButtonBar',
    components:{
      CheckButton
     },
     computed:{
       totalPrice(){
         return '￥'+ this.$store.state.cartList.filter(item => {
           return item.checked
         }).reduce((preValue,item) => {
           return preValue+item.price * item.count
         },0).toFixed(2)
       },
       checkLength(){
         return this.$store.state.cartList.filter(item =>item.checked).length
       },
       isSelectAll(){
         if(this.$store.state.cartList.length===0)return false
       return   !this.$store.state.cartList.find(item => !item.checked)
       }
     },
     methods:{
       checkClick(){
         if(this.isSelectAll){
           this.$store.state.cartList.forEach(item => item.checked =false)
         }else{
           this.$store.state.cartList.forEach(item => item.checked =true)
         }
       },
       calcClick(){
         if(!this.isSelectAll){
           this.$toast.show('请选择商品')
         }else{
           this.$toast.show('你也没钱,如果有把钱给cxx吧')
         }
       }
     }
  }
</script>

<style scoped>
  .button-bar{
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    font-size: 14px;

  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .check-content{
    display:  flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 5px;
  }
  .price{
    margin-left: 30px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background: red;
    color: #fff;
    text-align: center;
    }
</style>
