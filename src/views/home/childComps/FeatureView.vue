<template>
  <div class="feature">
    <div class="feature-item" >
      <a href="https://act.mogujie.com/zzlx67">
        <img src="~assets/img/home/recommend_bg.jpg" alt="">
      </a>
    </div>
  </div>
</template>

<script>
	export default {
		name: "FeatureView",
	}
</script>

<style scoped>
  .feature {
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    padding-bottom: 30px;
    border-bottom: 10px solid #eee;
  }

  .feature-item {
    flex: 1;
    text-align: center;
  }

  .feature img {
    width: 100%;
  }
</style>
