<template>
  <div
    class="boss-fxqb"
    v-show="status == 1"
    :style="'background: url(../../static/slices/fxqb_bg_root.png?v=1.0); background-size:108%'"
  >
    <div class="bg-header">
      <img src="../../static/slices/fxqb_header.png?v=1.0" alt srcset />
    </div>

    <div class="bg">
      <img :src="$route.meta.slices.bg" class="bg-img" alt />
    </div>
    <div class="main">
      <div class="panel">
        <div class="tab_title">
          <img src="../../static/slices/fxqb_text_btn.png?v=1.0" alt />
        </div>
        <div class="input-box" style="border-top-color: #ccc">
          <img class="input-icon" src="../../static/slices/user-icon.png?v=1.0" alt />
          <input type="text" placeholder="请输入手机号" v-model="telphone" />
        </div>
        <div class="input-box">
          <img class="input-icon" src="../../static/slices/psw-icon.png?v=1.0" alt />
          <input type="text" placeholder="请输入验证码" v-model="code" />
          <span
            class="send-btn"
            :class="wait>0?'disabled':''"
            @click="send_sms"
          >{{wait>0?'重新发送('+wait+'秒)':'获取验证码'}}</span>
        </div>
        <div class="submit-btn">
          <img class="btn-img" :src="$route.meta.slices.btn" alt />
          <span class="text" @click="handle_submit">立即申请</span>
          <img class="main-footer" src="../../static/slices/main-footer.png?v=1.0" alt srcset />
        </div>

        <!-- <div class="foot">
          <img src="../../static/slices/fxqb_foot.png?v=1.0" width="65%"/>
        </div>-->
      </div>
      <van-popup
        round
        close-icon="../../static/slices/close-icon.png?v=1.0"
        closeable
        v-model="show"
        position="bottom"
        :style="{ height: '65%'}"
      >
        <div class="popup-header">安装说明</div>
        <div class="popup-main">
          <p>
            ① 同意安装后，将自动在桌面开始安装，成功后可以 在桌面看到
            <span style="color:red">放薪钱包</span>
          </p>
          <img class="all-icon" src="../../static/slices/all-icon.png?v=1.0" alt />
          <p>
            ②
            <span class="color3c">安装成功后，在手机里找到</span>[设置]--[通用]--[设备 管理]--[企业级APP]，
            <span class="color3c">再点击</span>[信任]
            <span class="color3c">即可使用此APP</span>
          </p>
          <p style="color:#cd4848">小贴士：点击【信任】可直接跳转到设备管理。请安装成功后再去信任哦</p>
          <div @click="ios_download()" class="popup-btn">点击我去信任</div>
        </div>
      </van-popup>
    </div>
    <div class="beian" style="height:1rem;line-height:1rem">
      <a href="http://www.beian.miit.gov.cn/" target="_blank">{{icp}}</a>
    </div>
  </div>
</template>
<script>
import { Toast, Popup } from "vant";
import "vant/lib/toast/style";
import md5 from "js-md5";
import Vue from "vue";
Vue.use(Popup);

export default {
  data() {
    return {
      telphone: "",
      code: "",
      wait: 0,
      deviceType: null, //设备类型，1=安卓；2=ios
      downurl: "",
      downurl1: "",
      status: 0,
      showRegd: false,
      submit_res_data: null,
      show_download: false,
      download_page: false,
      ress: null,
      icp: "",
      show: false,
      jumpSetting: "",
    };
  },

  created() {
    this.set_device();
    this.send_BP_1(3); //发送埋点测试

  },
  mounted() {

    this.set_device();
    this.send_BP(1); //发送埋点
    //
    this.listens();
  },
  methods: {

    //弹出层

    start_wait() {
      this.wait = 60;
      var t = null;

      t = setInterval(() => {
        if (this.wait > 0) {
          this.wait--;
        } else {
          clearInterval(t);
        }
      }, 1000);
    },
    show_success() {},
    //
    send_sms() {
      //this.handle_submit()
      //return;

      if (this.wait > 0) {
        Toast.fail(this.wait + "秒后可重新发送");
      } else {
        this.$axios
          .post("https://api.txwl7758520.top/send.code?platform=3", {
            main_channel: this.$route.meta.appType,
            t: this.$get_time(),
            app_version: "1.0",
            push_str: this.$route.query.push_str
              ? this.$route.query.push_str
              : "",
            phone: this.telphone,
            type: 1
          })
          .then(res => {
            //console.log(res);
            if (res.code == 200) {
              this.start_wait();
              Toast.success(res.msg);
            } else {
              Toast.fail(res.msg);
            }
          });
      }
    },

    listens() {
      (function() {
        let myFunction;
        let isWXAndIos = isWeiXinAndIos();
        if (isWXAndIos) {
          document.body.addEventListener("focusin", () => {
            clearTimeout(myFunction);
          });
          document.body.addEventListener("focusout", () => {
            clearTimeout(myFunction);
            myFunction = setTimeout(function() {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }, 100);
          });
        }
      })();

      function isWeiXinAndIos() {
        let ua = "" + window.navigator.userAgent.toLowerCase();
        let isWeixin = /MicroMessenger/i.test(ua);
        let isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua);
        return isWeixin && isIos;
      }
    },
    //判断设备
    set_device() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {
        this.deviceType = 2;
      } else {
        this.deviceType = 1;
      }
    },
    download() {
      console.log("download");
      this.send_BP(2);
      this.show_download = true;
      this.showRegd = false;
      if ("" != this.downurl) {
        window.location.href = this.downurl;
      }
      setTimeout(() => {
        if ("" != this.downurl1) {
          window.location.href = this.downurl1;
        }
      }, 1000);
    },
    handle_submit() {
      this.$axios
        .post("https://api.txwl7758520.top/login?platform=3", {
          main_channel: this.$route.meta.appType,
          t: this.$get_time(),
          app_version: "1.0",
          push_str: this.$route.query.push_str
            ? this.$route.query.push_str
            : "",

          phone: this.telphone,
          code: this.code
        })
        .then(res => {
          if (res.code == 200) {
            if (this.deviceType === 2) {
              this.show = true;
            }
            this.download();
            Toast.success(res.msg);
          } else {
            Toast.fail(res.msg);
          }
        })
        .catch(error => {
          //console.log(error)
        });
    },
    //发送埋点，1=页面进入，2=点击下载
    send_BP(type) {
      this.$axios
        .post("https://api.txwl7758520.top/h5?platform=3", {
          //公共参数
          main_channel: this.$route.meta.appType,
          t: this.$get_time(),
          app_version: "1.0",
          push_str: this.$route.query.push_str
            ? this.$route.query.push_str
            : "",

          //业务参数
          type: type,
          pingtai: this.deviceType,
          uniq: this.uniq()
        })
        .then(res => {
          this.jumpSetting = res.data.jumpSetting;

          console.log(res);
          this.status = res.data.status;
          if (res.code == 200 && "downurl" in res.data) {
            this.downurl = res.data.downurl;
            this.icp = res.data.icp;
            this.downurl1 = res.data.downurl1;
            this.ress = res.data;
          }
          //alert(this.downurl)
        });
    },
    //测试埋点
    send_BP_1(type) {
      this.$axios.post("https://api.txwl7758520.top/h5?platform=3", {
        //公共参数
        main_channel: this.$route.meta.appType,
        t: this.$get_time(),
        app_version: "1.0",
        push_str: this.$route.query.push_str ? this.$route.query.push_str : "",

        //业务参数
        type: type,
        pingtai: this.deviceType,
        uniq: this.uniq() //localStorage.getItem('Ip')
      });

    },
    uniq() {
      //return 1;
        if (localStorage.getItem("uniq")) {
          return localStorage.getItem("uniq");
        } else {
          localStorage.setItem("uniq", md5(Math.random().toString()));
          return localStorage.getItem("uniq");
        }
    },
    ios_download() {
      console.log("ios");
      window.location.href = this.jumpSetting;
    }
  }
};
</script>
<style lang="less">
.boss-fxqb {
  font-size: 0.5rem;
  width: 100%;
  min-height: 100%;
  height: auto;
  overflow: hidden;
  position: absolute;
  .bg-header {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    img {
      width: 80%;
      position: relative;
      text-align: center;
    }
  }
  .download-page {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    z-index: 999;
    background-color: #fafafa;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    box-sizing: border-box;
    padding: 1rem;

    .logo {
      width: 2rem;
    }

    .title {
      font-size: 0.4rem;
      color: #333;
      position: relative;

      > span {
        min-width: 1.7rem;
        font-weight: 400;
      }

      .platform,
      .version {
        vertical-align: top;
        box-sizing: border-box;
        border-radius: 0.05rem;
        width: 1rem;
        padding: 0.03rem 0.1rem;
        color: #fff;
        display: inline-block;
        font-size: 0.2rem;

        img {
          vertical-align: middle;
          width: 0.35rem;
        }
      }

      .version {
        vertical-align: middle;
        text-align: center;
      }

      .platform {
        text-align: right;
      }
    }

    .desc {
      padding-top: 0.5rem;
      font-size: 0.24rem;
      line-height: 1.8;
      font-weight: normal;
      color: #000;

      > span {
        margin: 0 0.1rem;
      }
    }

    .sub {
      font-size: 0.24rem;
    }

    .sub-mit-btn {
      margin-top: 0.4rem;
      width: 100%;
      position: relative;

      img {
        width: 100%;
      }

      .text {
        position: absolute;
        height: 1rem;
        font-size: 0.28rem;
        color: #fff;
        text-align: center;
        width: 100%;
        line-height: 1rem;
      }
    }
  }

  .dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;

    .panel {
      position: relative;
      width: 70%;
      padding: 0.4rem 0.2rem;
      background-color: #fff;
      border-radius: 0.3rem;
      margin: 0 auto;

      .title {
        text-align: center;
        font-size: 0.3rem;
        color: #333;
      }

      .content {
        text-align: center;
        font-size: 0.28rem;
        padding: 0.3rem 0;
        padding-bottom: 0.5rem;
      }

      > .download-btn {
        width: 80%;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        color: #fff;
        font-size: 0.3rem;
        margin: 0 auto;
        border-radius: 0.9rem;
      }
    }
  }

  .bg {
    position: relative;

    img.bg-img {
      width: 100%;
      vertical-align: top;
    }
  }

  .main {
    padding: 0 0.4rem;
    box-sizing: border-box;
    margin-top: -7rem;
    width: 100%;
    position: relative;
    margin-bottom: 4.4rem;
    z-index: 9;
    .top {
      position: relative;
      width: 3.9rem;
      height: 0.51rem;
      background: rgba(78, 243, 246, 1);
      border-radius: 2rem;
      margin: 0.5rem auto;
      p {
        font-size: 0.28rem;
        font-weight: bold;
        color: rgba(0, 134, 136, 1);
        text-align: center;
        height: 0.05rem;
        line-height: 0.5rem;
      }
    }

    .panel {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 0.3rem;
      padding: 0.4rem 0;
      .main-footer {
        position: absolute;
        top: 1.1rem;
        left: 0;
        bottom: 1rem;
        right: 0;
        width: 100%;
      }
      .tab_title {
        text-align: center;
        margin-top: -0.9rem;
        img {
          width: 80%;
        }
      }

      .submit-btn {
        position: relative;
        width: 100%;
        padding: 0 0.2rem;
        box-sizing: border-box;

        .btn-img {
          width: 100%;
        }

        .text {
          color: #794b1a;
          font-size: 0.3rem;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .input-box {
        display: flex;
        height: 1rem;
        background-color: #f8f8f8;
        border-radius: 0.1rem;
        margin: 0.3rem 0.4rem;
        margin-bottom: 0.24rem;
        padding: 0 0.4rem;
        .input-icon {
          vertical-align: center;
          width: 0.3rem;
          height: 0.4rem;
          margin-top: 0.3rem;
        }
        input {
          display: block;
          background-color: rgba(0, 0, 0, 0);
          outline: none;
          font-size: 0.24rem;
          border: 0;
          width: 80%;
          padding-left: 0.5rem;
        }

        input::-webkit-input-placeholder {
          color: #ccc;
        }

        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #ccc;
        }

        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #ccc;
        }

        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #ccc;
        }

        .send-btn {
          padding-left: 0.1rem;
          font-size: 0.24rem;
          color: #794b1a;
          line-height: 1rem;
          text-align: right;
          width: 50%;
        }

        .send-btn.disabled {
          color: #aaa;
        }
      }

      // .foot {
      //   text-align: center;
      //   margin: -0.2rem 0;
      // }
    }
  }
  .beian {
    text-align: center;
    a {
      color: #fff;
      font-size: 13px;
    }
  }
  .popup-header {
    height: 0.7rem;
    text-align: center;
    font-size: 20px;
    color: #333;
    padding-top: 0.2rem;
  }
  .popup-main {
    .color3c {
      color: #999;
    }
    border-top: 1px solid #ccc;
    padding: 0rem 0.3rem;
    font-size: 0.3rem;
    .all-icon {
      width: 100%;
    }
    .popup-btn {
      width: 90%;
      margin: 0 auto;
      height: 1rem;
      background-color: #fee661;
      border-radius: 40px;
      line-height: 1rem;
      text-align: center;
      color: #794b1a;
    }
  }
}
</style>
