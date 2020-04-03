import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/boss',
      name: 'boss',
      meta:{
        title:'BOSS钱包',
        slices:{
          bg:'/static/slices/boss_bg.png',
          btn:'/static/slices/boss_btn.png',
          logo:'/static/slices/boss_logo.png',
        },
        appType:1,
        bgcolor:{
          start:'#4ECDB1',
          end:'#38C6A7'
        },
        theme:'#53CAC3'
      },
      component: resolve=>require(['@/pages/boss.vue'],resolve)
    },
    {
      path: '/xindongdai',
      name: 'xindongdai',
      meta:{
        title:'薪动贷',
        slices:{
          bg:'/static/slices/yixiang_bg.png',
          btn:'/static/slices/yixiang_btn.png',
          logo:'/static/slices/yixiang_logo.png',
        },
        appType:10,
        bgcolor:{
          start:'#fd853a',
          end:'#FFB038'
        },
        theme:'#FA6464'
      },
      component: resolve=>require(['@/pages/yixiang.vue'],resolve)
    },
    {
      path: '/jdfq',
      name: 'jdfq',
      meta:{
        title:'借贷分期',
        slices:{
          bg:'/static/slices/jdfq-bg.png',
          btn:'/static/slices/yixiang_btn.png',
          logo:'/static/slices/jdfqlogo.png',
        },
        appType:9,
        bgcolor:{
          start:'#43BCFE',
          end:'#477BFE'
        },
        theme:'#FA6464'
      },
      component: resolve=>require(['@/pages/jdfq.vue'],resolve)
    },
    {
      path: '/laidaiba',
      name: 'laidaiba',
      meta:{
        title:'来贷吧',
        slices:{
          bg:'/static/slices/laidaiba_bg.png',
          btn:'/static/slices/laidaiba_btn.png',
          logo:'/static/slices/laidaiba_logo.png',
        },
        appType:2,
        bgcolor:{
          start:'#B0DAFF',
          end:'#B0DAFF'
        },
        theme:'#7C94F5'
      },
      component: resolve=>require(['@/pages/laidaiba.vue'],resolve)
    },
    {
      path: '/kuaidaibei',
      name: 'kuaidaibei',
      meta:{
        title:'快贷呗',
        slices:{
          bg:'/static/slices/kuaidaibei_bg.png',
          btn:'/static/slices/kuaidaibei_btn.png',
          logo:'/static/slices/kuaidaibei_logo.png',
          bg_img:'/static/slices/kuaidaibei_bgimg.png',
        },
        appType:11,
        bgcolor:{
          start:'#B0DAFF',
          end:'#B0DAFF'
        },
        theme:'#7C94F5'
      },
      component: resolve=>require(['@/pages/kuaidaibei.vue'],resolve)
    },
    {
      path: '/fxqb',
      name: 'fxqb',
      meta:{
        title:'放薪钱包',
        slices:{
          bg:'/static/slices/fxqb_bg.png?v=1.0',
          btn:'/static/slices/fxqb_btn.png?v=1.0',
          logo:'/static/slices/fxqb_logo.png?v=1.0',
        },
        appType:8,
        bgcolor:{
          start:'#B0DAFF',
          end:'#B0DAFF'
        },
        theme:'#7C94F5'
      },
      component: resolve=>require(['@/pages/fxqb.vue'],resolve)
    }
    ,
    {
      path: '/byj',
      name: 'byj',
      meta:{
        title:'备用金',
        slices:{
          bg:'/static/slices/fxqb_bg_2.png?v=1.0',
          bg2:'/static/slices/fxqb2_footer.png?v=1.0',
          btn:'/static/slices/fxqb_btn.png?v=1.0',
          logo:'/static/slices/fxqb_logo.png?v=1.0',
        },
        appType:8,
        bgcolor:{
          start:'#B0DAFF',
          end:'#B0DAFF'
        },
        theme:'#7C94F5'
      },
      component: resolve=>require(['@/pages/byj.vue'],resolve)
    }
    ,
    {
      path: '/jjfq',
      name: 'jjfq',
      meta:{
        title:'救急分期',
        slices:{
          bg:'/static/slices/jjfq_bg.png',
          btn:'/static/slices/jjfq_btn.png',
          logo:'/static/slices/jjfq_logo.png',
          bg_img:'/static/slices/jjfq_bgimg.png',
        },
        appType:1,
        bgcolor:{
          start:'#f2b451',
          end:'#f3ae51'
        },
        theme:'#7C94F5'
      },
      component: resolve=>require(['@/pages/jjfq.vue'],resolve)
    }
    ,
    {
      path: '/jjfq2',
      name: 'jjfq2',
      meta:{
        title:'救急分期',
        slices:{
          bg:'/static/slices/jjfq_bg.png',
          btn:'/static/slices/jjfq_btn.png',
          logo:'/static/slices/jjfq_logo.png',
          bg_img:'/static/slices/jjfq_bgimg.png',
        },
        appType:2,
        bgcolor:{
          start:'#f2b451',
          end:'#f3ae51'
        },
        theme:'#7C94F5'
      },
      component: resolve=>require(['@/pages/jjfq.vue'],resolve)
    }
  ]
})
