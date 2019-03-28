<template>
	<div class="runone">
		<!-- 最多跑一次子页面 -->
		<div class="runone-header">
			<img src="../../static/img/runone.png" alt="">
		</div>
		<div class="runone-body">
			<a class="runone-body-item" v-for="item in listData" :href="item.href">
				<div class="runone-body-item-icon">
					<img :src="item.img" alt="">
				</div>
				<div class="runone-body-item-word">
					{{item.title}}
				</div>
			</a>
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
						img:"./static/img/run_2.png",
						title:'身份证业务预约',
						href:'http://www.jxgaj.gov.cn/sjpages/OnlineOrder/OrderIndex.aspx?itemtype=1&itemcode=1'
					},
					{
						img:"./static/img/run_3.png",
						title:'户籍业务预约',
						href:'http://www.jxgaj.gov.cn/sjpages/OnlineOrder/OrderIndex.aspx?itemtype=2&itemcode=2'
					},
					{
						img:"./static/img/run_4.png",
						title:'行政许可预约',
						href:'http://www.jxgaj.gov.cn/sjpages/OnlineOrder/OrderItemList.aspx'
					},
					{
						img:"./static/img/run_5.png",
						title:'预约业务查询',
						href:'http://www.jxgaj.gov.cn/sjpages/OnlineOrder/Index.aspx?from=singlemessage&isappinstalled=0'
					}
			]
		}
	}
}
</script>
<style>
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
}
.runone-body-item{
	display: inline-block;
	text-decoration: none;
	height:3.52rem;
	width: 33.3%; 
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
