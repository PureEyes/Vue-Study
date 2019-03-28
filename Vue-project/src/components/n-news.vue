<template>
  <div class="index" v-if="listData.length > 0">
    <!-- 微信公众号下微矩阵的页面 -->
    <div class="index-header">
      <img :src="HeaderImg" alt="">
    </div>
    <div class="index-body">
      <div class="index-body-article" @touchstart="MoveStart" @touchend="MoveEnd">
        <a class="index-body-article-item" v-for="(item,index) in listData" :key="index" :href="item.to_url">
          <div class="index-body-article-item-wrap">
            <div class="index-body-article-item-left">
              <div class="index-body-article-item-title">
                {{item.title}}
              </div>
              <div class="index-body-article-item-source">
                <div class="index-body-article-item-source-o">来源：{{item.wechat_name}}</div>
                <div class="index-body-article-item-source-t">{{calcUpdate(item.publishtime)}}</div>
              </div>
            </div>
            <div class="index-body-article-item-right">
              <img :src="item.image" alt="">
            </div>
          </div>
        </a>
        <div class="hasnodata" v-show="!HasData">
          已无更多数据
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { XDialog, TransferDomDirective as TransferDom, LoadMore } from 'vux'
import { ArticleUrl } from '@/api/api'
import { getColumnDetail } from '../api/api.js'
let p = 1
export default {
  data() {
    return {
      StartPageY: 0,
      HasData: true,
      LoadMoreIcon: true,
      LoadMoreText: '暂无数据',
      ArticleList: [],
      options: {
        page: 1,
        pagesize: 20
      },
      HeaderImg: '',
      listData: []
    }
  },
  components: {
    XDialog,
    LoadMore
  },
  mounted() {
    if (this.$route.query.id) {
      this.ArticleAjax()
    }
  },
  methods: {
    calcUpdate(date) {
      var time = new Date().getTime()
      time = parseInt((time - date * 1000) / 1000)
      var s
      if (time < 60 * 10) {
        return '刚刚'
      } else if (time < 60 * 60 && time >= 60 * 10) {
        s = Math.floor(time / 60)
        return s + '分钟前'
      } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
        s = Math.floor(time / 60 / 60)
        return s + '小时前'
      } else if (time < 60 * 60 * 24 * 3 && time >= 60 * 60 * 24) {
        s = Math.floor(time / 60 / 60 / 24)
        return s + '天前'
      } else {
        var date = new Date(parseInt(date) * 1000)
        return (
          date.getFullYear() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getDate()
        )
      }
    },
    ArticleAjax() {
      let id = this.$route.query.id
      this.$http({
        method: 'GET',
        url: getColumnDetail,
        params: Object.assign({ id }, this.options)
      }).then(res => {
        const jsonpReturn = data => {
          return data
        }
        let data = eval(res.body)
        this.HeaderImg = this.urlProcess(data.data.channel.image)
        delete data.data.channel
        Object.keys(data.data).forEach(key => {
          this.listData.push(data.data[key])
        })
        if (Object.keys(data.data) <= 0) {
          this.HasData = false
        }
      })
    },
    urlProcess(url) {
      if (url.match(/^http/) && url.match(/^http/).length > 0) {
        return url
      }
      return 'http://jiaxinggongan.jxletong.com' + url
    },
    MoveStart(e) {
      this.StartPageY = e.touches[0].pageY
    },
    MoveEnd(e) {
      let distance = Math.abs(this.StartPageY - e.changedTouches[0].pageY)
      if (distance > 100) {
        this.LoadMore()
      }
    },
    LoadMore() {
      if (this.HasData) {
        this.options.page++
        // setTimeout(()=>{
        this.ArticleAjax()
        // },3000)
      }
    }
  }
}
</script>
<style scoped>
.index-header {
  width: 100%;
  /*height: 3.693333rem;*/
  height: 4.666667rem;
}
.index-header img {
  width: 100%;
  height: 100%;
}
.index-tab {
  width: 100%;
  height: 1.146667rem;
  line-height: 1.146667rem;
  display: flex;
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex;
}
.index-tab-item {
  flex: 1;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  text-align: center;
  font-size: 15px;
}
.index-tab-item span {
  width: 2.613333rem;
  height: 100%;
  display: inline-block;
}
.index-tab .active span {
  border-bottom: 3px solid #1d50ae;
  color: #1d50ae;
  font-weight: bold;
}
.index-body {
  margin-top: 0.6rem;
}
.index-body-attention {
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding-bottom: 1.466667rem;
}
.index-body-attention-item {
  display: inline-block;
  height: 2.933333rem;
  width: 33.3%;
}
.index-body-attention-item-avatar {
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 auto;
}
.index-body-attention-item-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.index-body-attention-item-word {
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}
.index-body-attention-b {
  width: 100%;
  height: 1.466667rem;
  line-height: 1.466667rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 14px;
  background: #fff;
  color: #969798;
}
.index-body-article-item {
  width: 100%;
  height: 3.466667rem;
  text-decoration: none;
  color: #000;
  border-bottom: 1px solid #e0e1e1;
  display: flex;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
}
.index-body-article-item-wrap {
  display: flex;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  align-items: top;
  -webkit-align-items: top;
  -moz-box-align: top;
  -ms-flex-align: top;
  -webkit-box-align: top;
  -webkit-box-pack: top;
  margin: 0 0.4rem;
}
.index-body-article-item-left {
  flex: 1;

  margin-right: 0.3rem;
}
.index-body-article-item-right {
  width: 2.96rem;
  height: 2.24rem;
}
.index-body-article-item-right img {
  width: 100%;
  height: 100%;
}
.index-body-article-item-title {
  width: 6rem;
  height: 75px;
  line-height: 26px;
  font-size: 18px;
  overflow: hidden;
  display: -webkit-box;
  /* autoprefixer: off*/
  -webkit-box-orient: vertical;
  /* autoprefixer: on*/
  -webkit-line-clamp: 3;
}
.index-body-article-item-source {
}
.index-body-article-item-source-o {
  display: inline-block;
  font-size: 12px;
  width: 90px;
  height: 0.426667rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #8f8f8f;
  vertical-align: middle;
}
.index-body-article-item-source-t {
  display: inline-block;
  width: 93px;
  font-size: 12px;
  color: #8f8f8f;
  /*margin-left: 0.2rem;*/
  vertical-align: middle;
}
.WxQrcode {
  /*width: 6rem;
	height: 6rem;*/
}
.WxQrcode .vux-x-dialog .weui-dialog {
  width: 6rem !important;
  height: 6rem !important;
}
.WxQrcode-tips {
  font-size: 15px;
  color: #666666;
  height: 1.066667rem;
  line-height: 1.066667rem;
}
.WxQrcode-wrap img {
  width: 100%;
  height: 100%;
}
.weui-dialog {
  width: 6rem !important;
  height: 6rem !important;
}
.hasnodata {
  height: 1.333333rem;
  line-height: 1.333333rem;
  text-align: center;
  color: #333;
  font-size: 16px;
}
</style>
