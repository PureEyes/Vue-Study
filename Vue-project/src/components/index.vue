<template>
	<div class="index">
		<!-- 微信公众号下微矩阵的页面 -->
		<div class="index-header">
			<img :src="HeaderImg" alt="">
		</div>
		<div class="index-tab">
			<div class="index-tab-item" :class="{'active':TabIndex==='2'}" @click="SwithTab($event)" data-index="2">
				<span data-index="2">微头条</span>
			</div>
			<div class="index-tab-item" @click="TurnToSpecail">
				<span data-index="3">微专题</span>
			</div>
			<div class="index-tab-item" :class="{'active':TabIndex==='1'}" @click="SwithTab($event)" data-index="1">
				<span data-index="1">微关注</span>
			</div>	
		</div>
		<div class="index-body">
			<div class="index-body-attention" v-show="TabShow">
				<a class="index-body-attention-item" v-for="item in listData" @click="ShowQrcode(item)">
					<div class="index-body-attention-item-avatar">
						<img v-lazy="item.img" alt="">
					</div>
					<div class="index-body-attention-item-word">
						{{item.title}}
					</div>
				</a>
			</div>
			<div class="index-body-attention-b" v-show="TabShow">
				@嘉兴市公安局
			</div>
			<div class="index-body-article" v-show="!TabShow" @touchstart="MoveStart" @touchend="MoveEnd">
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
				<!-- <load-more :show-loading="LoadMoreIcon" background-color="#fbf9fe"></load-more> -->
			</div>
		</div>
		<!-- <div class="WxQrcode"> -->
			<x-dialog v-model="XDialogShow" class="" hide-on-blur>
	        		<div class="WxQrcode-wrap">
	        			<img v-lazy="Qrcode" alt="">
	        		</div>
	              	<div class="WxQrcode-tips">
	              		长按二维码进入
	              	</div>	
	      	</x-dialog>
      	<!-- </div> -->
	</div>
</template>
<script>
import { XDialog,TransferDomDirective as TransferDom ,LoadMore} from 'vux'
import {ArticleUrl} from '@/api/api'
let p=1
	export default{
		data(){
			return{
				StartPageY:0,
				HasData:true,
				LoadMoreIcon:true,
				LoadMoreShow:true,
				LoadMoreText:'暂无数据',
				TabShow:false,
				TabIndex:'2',
				XDialogShow:false,
				Qrcode:'',
				ArticleList:[],
				HeaderImg:'',
				HeaderPayattenImg:'./static/img/header1.png',
				HeaderHeadlineImg:'./static/img/header2.png',
				listData:[
					{
						img:"./static/img/police_1.png",
						title:'南湖公安',
						Qrcode:'./static/img/qrcode_1.jpg'
					},
					{
						img:"./static/img/police_2.png",
						title:'秀州公安',
						Qrcode:'./static/img/qrcode_2.jpg'
					},
					{
						img:"./static/img/police_3.png",
						title:'嘉善公安',
						Qrcode:'./static/img/qrcode_3.jpg'
					},
					{
						img:"./static/img/police_4.png",
						title:'平湖公安',
						Qrcode:'./static/img/qrcode_4.jpg'
					},
					{
						img:"./static/img/police_5.png",
						title:'海盐公安',
						Qrcode:'./static/img/qrcode_5.jpg'
					},
					{
						img:"./static/img/police_6.png",
						title:'海宁公安',
						Qrcode:'./static/img/qrcode_6.jpg'
					},
					{
						img:"./static/img/police_7.png",
						title:'桐乡公安',
						Qrcode:'./static/img/qrcode_7.jpg'
					},
					{
						img:"./static/img/police_8.png",
						title:'经开公安',
						Qrcode:'./static/img/qrcode_8.jpg'
					},
					{
						img:"./static/img/police_9.png",
						title:'港区公安',
						Qrcode:'./static/img/qrcode_9.jpg'
					},
					{
						img:"./static/img/police_10.jpg",
						title:'高速交警',
						Qrcode:'./static/img/qrcode_10.jpg'
					},
					{
						img:"./static/img/police_11.jpg",
						title:'禁毒',
						Qrcode:'./static/img/qrcode_11.png'
					},
					{
						img:"./static/img/police_12.jpg",
						title:'公安消防支队',
						Qrcode:'./static/img/qrcode_12.jpg'
					},
					{
						img:"./static/img/police_13.jpg",
						title:'特殊品销售实名',
						Qrcode:'',
						link:'http://220.191.220.151:88/smdj/'
					},
					{
						img:"./static/img/police_14.png",
						title:'浙江政务网app',
						Qrcode:'./static/img/qrcode_14.png'
					},
					{
						img:"./static/img/police_15.png",
						title:'中国嘉兴',
						Qrcode:'',
						link:'http://www.jiaxing.gov.cn/'
					}
				]
			}
		},
		components:{
			XDialog,
			LoadMore
		},
		mounted(){
			this.ArticleAjax()
			if (this.$route.query.section) {
				let e = 0 //防止报错
				let section = this.$route.query.section
				this.SwithTab(e,section)
			}else{
				this.SwitchBanner()
			}
		},
		methods:{
			SwitchBanner(){
				if (this.TabIndex=='2') {
					this.HeaderImg = this.HeaderHeadlineImg
				}
				if (this.TabIndex=='1') {
					this.HeaderImg = this.HeaderPayattenImg
				}
			},
			TurnToSpecail(){
				this.$router.push({
					path:"/specail"
				})
			},
			SwithTab(e,section){
				let index
				if (section) {
					index = section
				}else{
					index = e.target.getAttribute("data-index")		
				}
				this.TabIndex=index
				if (this.TabIndex=='1') {
					this.TabShow=true
					
				}else if(this.TabIndex=='2'){
					this.TabShow=false

				}
				this.SwitchBanner()
			},
			ShowQrcode(item){
				if (item.Qrcode==='') {
					window.location=item.link
					return
				}
				this.Qrcode=item.Qrcode
				this.XDialogShow=true
			},
			ArticleAjax(){
				this.LoadMoreShow=true
				this.$http({
					method:'GET',
					url:ArticleUrl,
					params:{p:p}
				}).then((res)=>{
					this.LoadMoreShow=false
					if (!res.data.data.data.length) {
						this.HasData=false
						return
					}
					this.ArticleList=this.ArticleList.concat(res.data.data.data)
				})
			},
			MoveStart(e){
				this.StartPageY=e.touches[0].pageY
			},
			MoveEnd(e){
				let distance=Math.abs(this.StartPageY-e.changedTouches[0].pageY)
				if (distance>100) {
					this.LoadMore()
				}
			},
			LoadMore(){
				if (this.HasData) {
					p=p+1
					// setTimeout(()=>{
						this.ArticleAjax()
					// },3000)
					
				}		
			}
		}
	}
</script>
<style scoped>
.index-header{
	width: 100%;
	/*height: 3.693333rem;*/
	height: 4.666667rem;
}
.index-header img{
	width: 100%;
	height: 100%;
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
.index-body{
	margin-top: 0.6rem;
}
.index-body-attention{
	width: 90%;
	height: 100%;
	margin: 0 auto;
	padding-bottom: 1.466667rem;
}
.index-body-attention-item{
	display: inline-block;
	height:2.933333rem;
	width: 33.3%; 
}
.index-body-attention-item-avatar{
	width: 1.6rem;
	height: 1.6rem;
	margin:0 auto;
}
.index-body-attention-item-avatar img{
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.index-body-attention-item-word{
	text-align: center;
	font-size: 14px;
	margin-top: 10px;
}
.index-body-attention-b{
	width: 100%;
	height: 1.466667rem;
	line-height:1.466667rem;
	text-align: center;
	position: fixed;
	bottom: 0;
	left: 0;
	font-size: 14px;
	background: #fff;
	color: #969798;
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
.WxQrcode{
	/*width: 6rem;
	height: 6rem;*/
}
.WxQrcode .vux-x-dialog .weui-dialog{
	width: 6rem!important;
	height: 6rem!important;
}
.WxQrcode-tips{
	font-size: 15px;
	color: #666666;
	height: 1.066667rem;
	line-height: 1.066667rem;
}
.WxQrcode-wrap img{
	width: 100%;
	height: 100%;
}
.weui-dialog{
	width: 6rem!important;
	height: 6rem!important;
}
.hasnodata{
	height: 1.333333rem;
	line-height: 1.333333rem;
	text-align: center;
	color: #333;
	font-size: 16px;
}
</style>
