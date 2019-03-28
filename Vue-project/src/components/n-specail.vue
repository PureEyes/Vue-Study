<template>
  <div class="specail">
    <!-- 和首页相对应的页面 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in BannerList" :key="index">
          <img :src="urlProcess(item.image)" alt>
          <div class="swiper_item_word">
            <div class="icon_label">专题</div>
            <div class="title">{{item.title}}</div>
            <div class="infor">
              <span class="origin">{{item.wechat_name}}</span>
              <span class="time">{{item.article_date}}</span>
            </div>
          </div>
          <div class="cover_bg"></div>
        </div>
      </div>
    </div>
    <div class="index-tab">
      <img class="arrow left" @click="arrowJumpHandle('left')" src="../../static/img/gongan-arrow-l.png" alt>
      <scroll scrollX ref="scroll" :style="`width:100%;height:100%;overflow:hidden`">
        <div class="nav-wrap" ref="wrap">
          <div class="index-tab-item" :class="{active:TypeId==699 && BannerList.length > 0}" @click="jump(699)" data-id="699" ref="sanda">
            <span data-index="3">三大活动</span>
          </div>
          <div
            class="index-tab-item"
            :class="{active:TypeId==698 && BannerList.length > 0}"
            @click="jump(698)"
            data-index="2"
            ref="moreOne"
            data-id="698"
          >
            <span data-index="2">最多跑一次</span>
          </div>
          <div class="index-tab-item" :class="{active:TypeId==5563 && BannerList.length > 0}" @click="jump(5563)" data-index="1">
            <span data-index="1">打击食药犯罪</span>
          </div>
          <div class="index-tab-item" :class="{active:TypeId==5563 && BannerList.length > 0}" @click="jump(5563)" data-index="1">
            <span data-index="1">打击食药犯罪</span>
          </div>
          <div class="index-tab-item" :class="{active:TypeId==5563 && BannerList.length > 0}" @click="jump(5563)" data-index="1">
            <span data-index="1">打击食药犯罪</span>
          </div>
        </div>
      </scroll>
      <img class="arrow right" @click="arrowJumpHandle('right')" src="../../static/img/gongan-arrow-r.png" alt>
    </div>
    <div class="index-body-article" @touchstart="MoveStart" @touchend="MoveEnd">
      <a class="index-body-article-item" v-for="(item,index) in ArticleList" :key="index" :href="item.to_url">
        <div class="index-body-article-item-wrap">
          <div class="index-body-article-item-left">
            <div class="index-body-article-item-title">{{item.title}}</div>
            <div class="index-body-article-item-source">
              <div class="index-body-article-item-source-o">来源：{{item.wechat_name}}</div>
              <div class="index-body-article-item-source-t">{{calcUpdate(item.publishtime)}}</div>
            </div>
          </div>
          <div class="index-body-article-item-right">
            <img :src="urlProcess(item.image)" alt>
          </div>
        </div>
      </a>

      <div class="hasnodata" v-show="!HasData">已无更多数据</div>
    </div>
  </div>
</template>
<script>
// import {Swiper,SwiperItem} from 'vux'
import { SpecailPicUrl, SpecalilArticleUrl } from "@/api/api";
import { getColumnDetail } from "../api/api.js";
import Scroll from "../base/scroll";

const zhuantiID = 50;
const wenzhangID = 45;

export default {
  data() {
    return {
      page: 1, //页数
      BannerList: [],
      ArticleList: [],
      StartPageY: 0,
      TypeId: 0,
      HasData: true,
      spId: null,
      routerActId: 0
    };
  },
  components: {
    Scroll
  },
  mounted() {
    // 获取专题列表
    this.GetSwiperBanner();
    this.setHerScrollNavWidth();
  },
  methods: {
    // 设置横向滚动导航条的宽度
    setHerScrollNavWidth() {
      const navItems = document.querySelectorAll(".nav-wrap .index-tab-item");
      this.$refs.wrap.style.width =
        [].reduce.call(
          navItems,
          (pre, v) => {
            return v.clientWidth + pre;
          },
          100
        ) + "px";
      this.$refs.scroll.refresh();
    },
    arrowJumpHandle(target) {
      const jumpList = [699, 698, 5563];
      let fIndex = jumpList.findIndex(v => v == this.TypeId);
      if (target === "left" && fIndex > 0) {
        this.jump(jumpList[fIndex - 1]);
      }
      if (target === "right" && fIndex < jumpList.length - 1) {
        this.jump(jumpList[fIndex + 1]);
      }
    },
    InitSwiper(initIndex) {
      let _this = this;
      let options = {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        on: {
          slideChange() {
            _this.ArticleTypeChange(this.activeIndex);
          }
        }
      };

      if (initIndex >= 0) {
        options.initialSlide = initIndex;
      }
      var swiper = new Swiper(".swiper-container", options);
    },
    urlProcess(url) {
      if (url.match(/^http/) && url.match(/^http/).length > 0) {
        return url;
      }
      return "http://jiaxinggongan.jxletong.com" + url;
    },
    ArticleTypeChange(index) {
      this.HasData = true;
      this.TypeId = this.BannerList[index].id;
      this.ArticleList = [];
      this.page = 1;
      this.GetArticleInfor();
    },
    calcUpdate(date) {
      console.log(date);
      var time = new Date().getTime();
      time = parseInt((time - date * 1000) / 1000);
      var s;
      if (time < 60 * 10) {
        return "刚刚";
      } else if (time < 60 * 60 && time >= 60 * 10) {
        s = Math.floor(time / 60);
        return s + "分钟前";
      } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
      } else if (time < 60 * 60 * 24 * 3 && time >= 60 * 60 * 24) {
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
      } else {
        var date = new Date(parseInt(date) * 1000);
        return (
          date.getFullYear() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          date.getDate()
        );
      }
    },
    GetSwiperBanner() {
      this.$http({
        method: "GET",
        url: getColumnDetail,
        params: { id: zhuantiID }
      }).then(res => {
        const jsonpReturn = data => {
          return data;
        };
        let data = eval(res.body);
        delete data.data.channel;
        this.BannerList = Object.keys(data.data).map(key => {
          return data.data[key];
        });
        this.TypeId = this.BannerList[0].id;
        let fIndex = -1;
        if (this.$route.query.id) {
          this.TypeId = this.$route.query.id;
          fIndex = this.BannerList.findIndex(v => {
            return v.id == this.$route.query.id;
          });
        }
        this.GetArticleInfor();
        this.$nextTick(() => {
          this.InitSwiper(fIndex);
        });
      });
    },
    jump(id) {
      let query = {};
      if (id) {
        query.id = id;
      }
      this.$router.push({ path: "", query });
      location.reload();
    },
    GetArticleInfor() {
      this.$http({
        method: "GET",
        url: getColumnDetail,
        params: { page: this.page, special: this.TypeId, id: wenzhangID }
      }).then(res => {
        const jsonpReturn = data => {
          return data;
        };
        let data = eval(res.body);
        delete data.data.channel;
        let list = [];
        Object.keys(data.data).forEach(key => {
          list.push(data.data[key]);
        });
        if (list.length <= 0) {
          this.HasData = false;
          return;
        }
        this.ArticleList = this.ArticleList.concat(list);
      });
    },
    MoveStart(e) {
      this.StartPageY = e.touches[0].pageY;
    },
    MoveEnd(e) {
      let distance = Math.abs(this.StartPageY - e.changedTouches[0].pageY);
      if (distance > 100) {
        this.page++;
        this.GetArticleInfor();
      }
    },
    LinkotherSection(e) {
      //跳转到别的版块
      let value = e.target.getAttribute("data-index");
      this.$router.push({
        path: "/",
        query: { section: value }
      });
    }
  },
  watch: {
    activeIndex(nVal) {
      let spId = this.TypeId;
    }
  }
};
</script>
<style>
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  width: 90% !important;
  height: 4.666667rem;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>
<style scoped>
.swiper_item img {
  width: 100%;
  height: 100%;
}
.cover_bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.3)
  );
}
.swiper_item_word {
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  z-index: 2;
  font-size: 12px;
  text-align: left;
}
.swiper_item_word .icon_label {
  display: inline-block;
  text-align: center;
  border-radius: 2px;
  height: 20px;
  line-height: 20px;
  width: 40px;
  margin-left: 0.3rem;
  margin-bottom: 0.1rem;
  background: #005fc1;
  color: #fff;
}
.swiper_item_word .title {
  font-size: 16px;
  padding-bottom: 0.136667rem;
  padding-left: 0.3rem;
  letter-spacing: 0px;
  line-height: 16px;
  font-weight: bold;
}
.swiper_item_word .infor {
  padding-bottom: 0.15rem;
  padding-left: 0.3rem;
}
.swiper_item_word .origin {
  padding-right: 0.2rem;
}
.index-header {
  width: 100%;
  height: 3.693333rem;
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
  display: inline-block;
  paddding: 0 20px;
  text-align: center;
  font-size: 15px;
}
.index-tab-item span {
  width: 2.613333rem;
  height: 100%;
  display: inline-block;
}
.index-tab .active span {
  color: #1d50ae;
  font-weight: bold;
  position: relative;
}

.index-tab .active span::after {
  content: "";
  display: inline-block;
  background-color: #1d50ae;
  width: 90%;
  height: 3px;
  position: absolute;
  left: 5%;
  bottom: 4px;
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
.hasnodata {
  height: 1.333333rem;
  line-height: 1.333333rem;
  text-align: center;
  color: #333;
  font-size: 16px;
}

.arrow {
  position: absolute;
  width: 10px;
}

.arrow.left {
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
}

.arrow.right {
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}

.index-tab {
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  padding: 0px 22px;
  box-sizing: border-box;
}

.index-tab::after {
  content: "";
  height: 100%;
  width: 1px;
  background-color: #e6e6e6;
  position: absolute;
  right: 21px;
  top: 0;
}

.index-tab::before {
  content: "";
  height: 100%;
  width: 1px;
  background-color: #e6e6e6;
  position: absolute;
  left: 21px;
  top: 0;
}

.nav-wrap {
  display: block;
  white-space: nowrap;
  width: auto;
}
</style>
