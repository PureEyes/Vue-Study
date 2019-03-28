<template>
	<div class="service">
		<!-- 微服务 -->
		<div class="service-header">
			<img src="../../static/img/jxga-hd.jpeg" alt="">
		</div>
		<div class="service-body">
			<a class="service-body-item" v-for="item in listData" :href="item.href">
				<div class="service-body-item-icon">
					<img :src="item.img" alt="">
				</div>
				<div class="service-body-item-word" v-html="item.title">
					<!-- {{item.title}} -->
				</div>
			</a>
		</div>
		<div class="service-bottom">
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
						img:"./static/img/jxga-my.png",
						title:"社情民意大走访",
						href:"http://work.jxgaj.gov.cn/sqmydzf.html"
					},
					{
						img:"./static/img/service_10.png",
						title:'扫黑除恶线索举报',
						href:'http://work.jxgaj.gov.cn/jb.html' 
						//https://m.cswh.me/app/index.php/jxga/member/jubao.html?t=shcexsjb
					},
					{
						img:"./static/img/service_16.png",
						title:'枪爆违法举报',
						href:'http://work.jxgaj.gov.cn/zzqbjb.html'
						//https://m.cswh.me/app/index.php/jxga/member/jubao.html?t=qbwfjb
					},
					{
						img:"./static/img/service_12.png",
						title:'剿灭劣V类水',
						href:'http://work.jxgaj.gov.cn/syhjb.html'
						//https://m.cswh.me/app/index.php/jxga/member/jubao.html?t=cmlvls
					},
					{
						img:"./static/img/service_1.png",
						title:'汽车年检预约',
						href:'http://www.jxjdcjc.com/order.html'
					},
					{
						img:"./static/img/service_2.png",
						title:'机动车违法查询',
						href:'http://www.zjsgat.gov.cn:8087/was/phone/carIllegalQuery.jsp?from=singlemessage&isappinstalled=0'
					},
					{
						img:"./static/img/service_3.png",
						title:'驾驶证记分查询',
						href:'http://www.zjsgat.gov.cn:8080/was/phone/carcredit/carCreditQuery.jsp?from=singlemessage&isappinstalled=0'
					},
					{
						img:"./static/img/service_4.png",
						title:'重名查询',
						href:'http://220.191.220.151:1001/Home/SelectService_Duplication_Condition?dType=1'
					},
					{
						img:"./static/img/service_5.png",
						title:'便捷挪车',
						href:'http://api.lvwan365.com/h5/11/ms66/nuoche.html?from=singlemessage&isappinstalled=0'
					},
					{
						img:"./static/img/service_7.png",
						title:'网上寻人',
						href:'http://220.191.220.151:1001/Home/PoliceInformationList_Xrqs?TypeID=&isNew=&dType=1'
					},
					{
						img:"./static/img/service_8.png",
						title:'失物招领',
						href:'http://220.191.220.151:1001/Home/PoliceInformationList_Swrl?TypeID=&isNew=&dType=1'
					},
					{
						img:"./static/img/service_9.png",
						title:'悬赏通缉',
						href:'http://220.191.220.151:1001/Home/PoliceInformationList?dType=1'
					},
					
					{
						img:"./static/img/service_11.png",
						title:'警事新闻报料',
						href:'http://open.afeel.net/inform.html'
					},
					
					{
						img:"./static/img/service_13.png",
						title:'案件进度查询',
						href:'http://ajgk.zjsgat.gov.cn:66/was/portals/ygzf/wxygzf.jsp'
					},
					{
						img:"./static/img/service_15.png",
						title:"党的十九大精神<br/>大讨论",
						href:'/html/#/article'
					},
				]
			}
		}
	}
</script>
<style>
.service-header {
  width: 100%;
  height: 3.693333rem;
}
.service-header img {
  width: 100%;
  height: 100%;
}
.service-body {
  padding-top: 0.933333rem;
  padding-bottom: 1.466667rem;
}
.service-body-item {
  display: inline-block;
  text-decoration: none;
  height: 3.52rem;
  width: 33.3%;
  vertical-align: middle;
}
.service-body-item-icon {
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 auto;
}
.service-body-item-icon img {
  width: 100%;
  height: 100%;
}
.service-body-item-word {
  color: #191919;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
}
.service-bottom {
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
</style>