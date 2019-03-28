<template>
	<div class="runone">
		<!-- 最多跑一次页面 -->
		<div class="runone-header">
			<img src="../../static/img/runone.png" alt="">
		</div>
		<div class="runone-body">
			<div class="runone-body-item" v-for="item in listData" @click="TurnTo(item)">
				<div class="runone-body-item-icon">
					<img :src="item.img" alt="">
				</div>
				<div class="runone-body-item-word">
					{{item.title}}
				</div>
			</div>
		</div>
		<div class="runone-bottom">
				@嘉兴市公安局
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				listData:[
					{
						img:"./static/img/run_1.png",
						title:'出入境办证预约',
						href:'http://220.191.220.151:1001/Crjyw/Crjyw_Manage?dType=1'
					},
					{
						img:"./static/img/run_2.png",
						title:'身份证、户籍、行政许可类预约办理',
						href:'',
						router:'/runonechild'
					},
					{
						img:"./static/img/run_6.png",
						title:'民之期待',
						href:'http://jxga.jxletong.com/html/#/suggest'
					},
					{
						img:"./static/img/run_7.png",
						title:'跑一次事项',
						href:'http://www.zjzwfw.gov.cn/zjzw/item/runonce/location.do?webId=40&dept=001008004008006'
					},
					{
						img:"./static/img/run_8.png",
						title:'监管场所 网上视频会见',
						href:'',
						router:'/runonevideo'
					},
					{
						img:"./static/img/run_9.png",
						title:'房屋出租登记',
						href:'',
						router:'/runonehouse'
					},
					{
						img:"./static/img/run_10.png",
						title:'流动人口居住登记',
						href:'',
						router:'/runonepopulation'
					},
					{
						img:"./static/img/run_11.png",
						title:'治安快报',
						href:'http://weixin.baoan.syn-trust.net/htm/apply.html'
					}
				]
			}
		},
		methods:{
			TurnTo(item){
				console.log(item)
				if (item.href=='') {
					this.$router.push({
						path:item.router
					})
				}else{
					window.location=item.href
				}
			}
		}
	}
</script>
<style scoped>
.runone-header{
	width: 100%;
	height: 3.693333rem;
}
.runone-header img{
	width: 100%;
	height: 100%;
}
.runone-body{
	padding-top: 0.933333rem;
	padding-bottom: 1.466667rem;
}
.runone-body-item{
	display: inline-block;
	text-decoration: none;
	/*height:3.52rem;*/
	width: 33.3%;
	vertical-align: middle; 
}
.runone-body-item-icon{
	width: 1.6rem;
	height: 1.6rem;
	margin: 0 auto;
}
.runone-body-item-icon img{
	width: 100%;
	height: 100%; 
}
.runone-body-item-word{
	color:#191919;
	font-size: 14px;
	text-align: center;
	margin-top: 5px;
	height:55px; 
}
.runone-bottom{
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
</style>