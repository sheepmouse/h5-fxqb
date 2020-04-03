<template>
  <div id="app">
    <div class="covers">
      <img src="https://static.txwl7758520.top/coverimg.png" alt="" class="coverimg">
    </div>
    <router-view class="router-view"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {

  },
  mounted() {
      this.showWxTip();
  },
  methods: {
      showWxTip() {
          if (isWeiXin()) {
              let covers = document.getElementsByClassName("covers")[0];
              covers.style.zIndex="10000";
              covers.style.backgroundColor="rgba(0, 0, 0, 0.86)";
          }
          function isWeiXin() {
              let ua = '' + window.navigator.userAgent.toLowerCase();
              let isWeixin = /MicroMessenger/i.test(ua);
              return isWeixin;
          }
      }
  }
}
</script>
<style lang="less">
html,body{
  width:100%;
  height: 100%;
  margin:0;
  position: absolute;
  padding:0;
  *{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .boss-1 img,.boss-fxqb img{pointer-events: none;}
  #app{
    width:100%;
    height:100%;
    position: absolute;
    .router-view{
      width:100%;
    }
    .covers {
      width: 100%;
      height: 100%;
      position: fixed;
      .coverimg {
        float: right;
      }
    }
  }
}
</style>
