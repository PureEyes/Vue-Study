<template>
  <div class="runone" v-if="listData !== null">
    <!-- 最多跑一次页面 -->
    <div class="runone-header">
      <img :src="calcTopImage()" alt="">
    </div>
    <div class="runone-body">
      <div class="runone-body-item" v-for="(item,key) in listData" @click="TurnTo(item)" v-if="key !== 'channel'" :key="item.id">
        <div class="runone-body-item-icon">
          <img :src="item.image" alt="">
        </div>
        <div class="runone-body-item-word">
          {{item.title}}
        </div>
      </div>
    </div>
    <div class="runone-bottom">
      @嘉兴市公安局
    </div>
    <x-dialog v-model="XDialogShow" class="" hide-on-blur>
      <div class="WxQrcode-wrap">
        <img v-lazy="Qrcode" alt="">
      </div>
      <div class="WxQrcode-tips">
        长按二维码进入
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog } from 'vux'
import { getColumnDetail } from '../api/api.js'
export default {
  mounted() {
    if (this.$route.query.id) {
      this.getColumnDetail(this.$route.query.id)
    }
  },
  data() {
    return {
      listData: null,
      channelData: null,
      XDialogShow: false,
      Qrcode: ''
    }
  },
  components: { XDialog },
  methods: {
    getColumnDetail(id) {
      this.$http.get(getColumnDetail, { params: { id } }).then(res => {
        const jsonpReturn = data => {
          return data
        }
        let data = eval(res.body)
        this.listData = data.data
        this.channelData = data.data.channel
        // document.title = this.channelData.name
      })
    },
    urlProcess(url) {
      if (url.match(/^http/) && url.match(/^http/).length > 0) {
        return url
      }
      return 'http://jiaxinggongan.jxletong.com' + url
    },
    calcTopImage() {
      let url = this.channelData.image
      return this.urlProcess(url)
    },
    TurnTo(item) {
      if (item.qr_image && item.qr_image !== '') {
        this.XDialogShow = true
        this.Qrcode = this.urlProcess(item.qr_image)
      } else {
        window.location = item.to_url
      }
    }
  }
}
</script>

<style scoped>
.runone-header {
  width: 100%;
  height: 3.693333rem;
}
.runone-header img {
  width: 100%;
  height: 100%;
}
.runone-body {
  padding-top: 0.933333rem;
  padding-bottom: 1.466667rem;
}
.runone-body-item {
  display: inline-block;
  text-decoration: none;
  /*height:3.52rem;*/
  width: 33.3%;
  vertical-align: middle;
  margin-bottom: 5px;
}
.runone-body-item-icon {
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 auto;
}
.runone-body-item-icon img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.runone-body-item-word {
  color: #191919;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  width: 100%;
}
.runone-bottom {
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
.WxQrcode-wrap img {
  width: 100%;
}
</style>