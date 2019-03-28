<template>
	<div class="runone">
		<!-- 房屋出租登记 -->
		<div class="runone-header">
			<img src="../../static/img/runone.png" alt="">
		</div>
		<div class="runonehouse">
			<a :href="item.link" v-for="item in listData" class="runonehouseitem">{{item.name}}</a>
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
					name:'南湖',
					link:'http://jxnh.zjzwfw.gov.cn/art/2017/7/28/art_49599_112248.html'
				},
				{
					name:'秀洲',
					link:'http://jxxz.zjzwfw.gov.cn/art/2017/4/11/art_49600_107375.html'
				},
				{
					name:'平湖',
					link:'http://jxph.zjzwfw.gov.cn/art/2017/8/5/art_49601_112588.html'
				},
				{
					name:'桐乡',
					link:'http://jxtx.zjzwfw.gov.cn/art/2017/7/31/art_49603_112386.html'
				},
				{
					name:'嘉善',
					link:'http://jxjs.zjzwfw.gov.cn/art/2017/7/31/art_49604_112400.html'
				},
				{
					name:'海宁',
					link:'http://jxhn.zjzwfw.gov.cn/art/2017/5/24/art_49602_109754.html'
				},
				{
					name:'海盐',
					link:'http://jxhy.zjzwfw.gov.cn/art/2017/1/7/art_49605_100311.html'
				},
				{
					name:'嘉兴港区',
					link:'http://jxgq.zjzwfw.gov.cn/art/2017/7/31/art_57127_112414.html'
				},
				{
					name:'嘉兴经济开发区',
					link:'http://jxkfq.zjzwfw.gov.cn/art/2017/12/30/art_1367936_118687.html'
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
.runonehouse{
	margin-top: 0.666667rem;
	padding: 0 0.4rem;
}
.runonehouseitem{
	display: inline-block;
	margin-right: 0.266667rem;
	margin-bottom: 0.266667rem;
	padding: 0.266667rem;
	border: 1px #ddd solid;
	border-radius: 5px;
	text-decoration: none;
	color: #333
}

</style>
