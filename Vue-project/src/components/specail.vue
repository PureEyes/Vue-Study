<template>
	<div class="specail">
		<!-- 和首页相对应的页面 -->
		<div class="swiper-container">
		    <div class="swiper-wrapper">
		    	
		      <div class="swiper-slide" v-for="(item,index) in BannerList">
		      	<img :src="item.article_cover" alt="">
		      	<div class="swiper_item_word">
		      		<div class="icon_label">专题</div>
					<div class="title">{{item.title}}</div>
					<div class="infor">
						<span class="origin">{{item.wechat_name}}</span>
						<span class="time">{{item.article_date}}</span>
					</div>
				</div>
				<div class="cover_bg">
						
				</div>
		      </div>
		    </div>
		</div>
		<div class="index-tab">
			<div class="index-tab-item" @click="LinkotherSection($event)" data-index="2">
				<span data-index="2">微头条</span>
			</div>
			<div class="index-tab-item active">
				<span data-index="3">微专题</span>
			</div>
			<div class="index-tab-item" @click="LinkotherSection($event)" data-index="1">
				<span data-index="1">微关注</span>
			</div>	
		</div>
		<div class="index-body-article" @touchstart="MoveStart" @touchend="MoveEnd" >
				<a class="index-body-article-item" v-for="item in ArticleList" :href="item.article_link">
					<div class="index-body-article-item-wrap">
						<div class="index-body-article-item-left">
							<div class="index-body-article-item-title">
							{{item.title}}
							</div>
							<div class="index-body-article-item-source">
								<div class="index-body-article-item-source-o">来源：{{item.wechat_name}}</div>
								<div class="index-body-article-item-source-t">{{item.article_date}}</div>
							</div>
						</div>
						<div class="index-body-article-item-right">
							<img :src="item.article_cover" alt="">
						</div>
					</div>	
				</a>

				<div class="hasnodata" v-show="!HasData">
					已无更多数据
				</div>
		</div>
	</div>
</template>
<script>
// import {Swiper,SwiperItem} from 'vux'
import {SpecailPicUrl,SpecalilArticleUrl} from '@/api/api'
export default{
	data(){
		return{
			page:1,//页数
			BannerList:[],
			ArticleList:[],
			StartPageY:0,
			TypeId:0,
			HasData:true
		}
	},
	components:{
		// Swiper,
		// SwiperItem
	},
	created(){
		this.GetSwiperBanner()
		
	},
	mounted(){
		
	},
	methods:{
		InitSwiper(){
			let _this = this
			var swiper = new Swiper('.swiper-container', {
		      slidesPerView: 'auto',
		      centeredSlides: true,
		      spaceBetween: 10,
		      pagination: {
		        el: '.swiper-pagination',
		        clickable: true,
		      },
		      on:{
		      	slideChange(){
		      		_this.ArticleTypeChange(this.activeIndex)
		      	}
		      }
		    });
		},
		ArticleTypeChange(index){
			console.log(index)
			this.HasData=true
			this.TypeId=this.BannerList[index].id
			this.ArticleList=[]
			this.page=1
			this.GetArticleInfor()
		},
		GetSwiperBanner(){
			this.$http({
				method:'GET',
				url:SpecailPicUrl
			}).then((res)=>{
				if (res.data.code===0) {
					this.BannerList=res.data.data.data
					this.TypeId=this.BannerList[0].id
					this.GetArticleInfor()
				}
				this.$nextTick(()=>{
					this.InitSwiper()
				})
				
			})
		},
		GetArticleInfor(){
			this.$http({
				method:'GET',
				url:SpecalilArticleUrl,
				params:{p:this.page,id:this.TypeId}
			}).then((res)=>{
				if (res.data.code===0) {
					if (!res.data.data.data.length) {
						this.HasData=false
						return
					}
					this.ArticleList=this.ArticleList.concat(res.data.data.data) 
				}
			})
		},
		MoveStart(e){
				this.StartPageY=e.touches[0].pageY
			},
		MoveEnd(e){
				let distance=Math.abs(this.StartPageY-e.changedTouches[0].pageY)
				if (distance>100) {
					this.page++
					this.GetArticleInfor()
				}
		},
		LinkotherSection(e){
			//跳转到别的版块
			let value = e.target.getAttribute("data-index")	
			console.log(value)
			this.$router.push({
				path:'/',
				query:{section:value}
			})
		}
	}
}	
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
      width: 90%!important;
      height: 4.666667rem;
    }
    .swiper-slide img{
    	width: 100%;
    	height: 100%;
    }
</style>
<style scoped>
.swiper_item img{
	width: 100%;
	height: 100%;
}
.cover_bg{
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: 100%;
	background: linear-gradient(180deg,rgba(0,0,0,0.3) ,rgba(0,0,0,0) ,rgba(0,0,0,0),rgba(0,0,0,0.3) );
}
.swiper_item_word{
	position: absolute;
	bottom: 0;
	left: 0;
	color: #fff;
	z-index: 2;
	font-size: 12px;
	text-align: left;
}
.swiper_item_word .icon_label{
	display: inline-block;
	text-align: center;
	border-radius: 2px;
	height: 20px;
	line-height: 20px;
	width: 40px;
	margin-left:0.3rem;
	margin-bottom: 0.1rem; 
	background:#005FC1;
	color: #fff;
}
.swiper_item_word .title{
	font-size: 16px;
	padding-bottom: 0.136667rem;
	padding-left: 0.3rem;
	letter-spacing: 0px;
	line-height: 16px;
	font-weight: bold;
}
.swiper_item_word .infor{
	padding-bottom: 0.15rem;
	 padding-left: 0.3rem;
}
.swiper_item_word .origin{
	padding-right: 0.2rem
}
.index-header{
	width: 100%;
	height: 3.693333rem;
}

.index-tab{
	width: 100%;
	height: 1.146667rem;
	line-height:1.146667rem; 
	display: flex;
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */ 
    display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */ 
    display: -ms-flexbox; /* TWEENER - IE 10 */ 
    display: -webkit-flex;
}
.index-tab-item{
	 flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    -webkit-flex: 1; 
    -ms-flex: 1;
	text-align: center;
	font-size: 15px;
}
.index-tab-item span{
	width: 2.613333rem;
	height: 100%;
	display: inline-block;
	
}
.index-tab .active span{
	border-bottom: 3px solid #1d50ae;
	color: #1d50ae;
	font-weight: bold;
}
.index-body-article-item{
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
	-webkit-align-items:center;
	-moz-box-align:center;
	-ms-flex-align:center;
	-webkit-box-align:center;
	-webkit-box-pack:center;	
}
.index-body-article-item-wrap{
	display: flex;
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	align-items: top;
	-webkit-align-items:top;
	-moz-box-align:top;
	-ms-flex-align:top;
	-webkit-box-align:top;
	-webkit-box-pack:top;
	margin:0 0.4rem;
}
.index-body-article-item-left{
	flex: 1;

	margin-right: 0.3rem;
}
.index-body-article-item-right{
	width: 2.96rem;
	height: 2.24rem;
}
.index-body-article-item-right img{
	width: 100%;
	height: 100%;
}
.index-body-article-item-title{
	width: 6.0rem;
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
.index-body-article-item-source{

}
.index-body-article-item-source-o{
	display:inline-block;
	font-size: 12px;
	width: 90px;
	height: 0.426667rem;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	color: #8f8f8f;
	vertical-align: middle;
}
.index-body-article-item-source-t{
	display:inline-block;
	width: 93px;
	font-size: 12px;
	color: #8f8f8f;
	/*margin-left: 0.2rem;*/
	vertical-align: middle;
}
.hasnodata{
	height: 1.333333rem;
	line-height: 1.333333rem;
	text-align: center;
	color: #333;
	font-size: 16px;
}	
</style>