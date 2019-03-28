<template>
	<div class="suggest">
		<!-- 建议页面 -->
		<div class="suggest-header">
			最多跑一次，需要您的支持与配合
		</div>
		<div class="suggest-body">
			<div class="suggest-body-item">
				<div class="item-name">姓名（网名）</div>
				<div class="item-content">
					<input type="text" v-model="UserInfo.name">
				</div>
			</div>
			<div class="suggest-body-item">
				<div class="item-name">联系电话</div>
				<div class="item-content">
					<input type="text" v-model="UserInfo.tel">
				</div>
			</div>
			<div class="suggest-body-item">
				<div class="item-name">建议内容（意见建议）</div>
				<div class="item-content">
					<textarea v-model="UserInfo.content"></textarea>
				</div>
			</div>
			<div class="suggest-body-item">
				<div class="item-name">您所反映问题属于</div>
				<div class="item-content">
					<select v-model="UserInfo.origin">
						<option :value="item.name" v-for="item in SelectList">{{item.name}}</option>
					</select>
				</div>
			</div>
		</div>
		<div class="suggest-btn" @click="Submit">
			提交
		</div>
		<div class="suggest-tips">
			<p>您可以围绕这些方面给我们提建议：</p>
			<p>1.您去公安机关办事的时候，是否体验过最多跑一次？</p>
			<p>2.您感觉现在办事更方便吗？</p>
			<p>3.您觉得哪些办事流程，可以简化或者最好能一起处理？</p>
			<p>4.对提高办事效率和群众满意度，您有什么高招妙招？</p>
			<p>5.您若感到办事服务更好，您想表扬谁或哪个窗口？</p>
		</div>
		<toast v-model="ToastShow" width="6rem" type="text">{{ToastTest}}</toast>
		<div class="popupwrapper">
			<popup v-model="PopupShow" height="100%" width="100%" position="left">
		        <div class="popupcontent">
		        	<div class="pop-title">
		        		最多跑一次，我有好建议
		        	</div>
		        	<div class="pop-first">
        		        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;今年以来，嘉兴公安积极践行“以人民为中心”的发展思想，从最大限度方便群众办事出发，推出就近办理、预约办理、网上办理等服务举措，尽最大努力让大家办事的时间更短、效率更高、过程更简单，只需要跑一次甚至不用跑。
		        	</div>
		        	<div class="pop-second">
		        		<div class="pop-second-t">
		        			● 什么是“最多跑一次呢”？
		        		</div>
		        		<div class="pop-second-c">
		        		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;就是您到政府部门窗口办事之前，通过电话咨询、上网查询等渠道，了解办事需要的材料，然后您准备齐全申请材料，到窗口申请办理，从受理到做出办理决定，您只需要去窗口一次。
有些申请事项可以直接在网上办理，您一次都不用跑。
		        		</div>
		        	</div>
		        	<div class="pop-three">
		        		<div class="pop-three-t">
		        			● 以下情况不算多跑一次
		        		</div>
		        		<div class="pop-three-c">	        			
					        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. 可以快递送达的，有的群众为了更安心自愿上门取件，这种情况不算多跑一次。<br>

					        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. 办事前上门咨询，也不算多跑一次。<br>

					        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. 办理材料不齐全的，从补齐材料以后开始算起是否实现“最多跑一次”。<br>

					        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4. 不符合办理条件的，收到否定性办理结果的，也算一次办结。<br>

					        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5. “容缺受理”，即政府部门对次要条件或手续有欠缺的事项，先予受理和办理，待材料补齐后，再出具办理结果。<br>
		        		</div>
		        		<div class="pop-btn" @click="ClosePop">
		        			我要提建议
		        		</div>
		        	</div>
		        </div>
		    </popup>
		</div>	
	</div>
</template>
<script>
import {Toast,Popup} from 'vux'
import {SubmitSuggestUrl} from '@/api/api'
	export default{
		data(){
			return{
				ToastShow:false,
				ToastTest:'',
				PopupShow:true,
				UserInfo:{
					name:'',
					tel:'',
					content:'',
					origin:'请选择'
				},
				SelectList:[
					{name:'请选择'},
					{name:'南湖公安'},
					{name:'秀洲公安'},
					{name:'嘉善公安'},
					{name:'平湖公安'},
					{name:'海盐公安'},
					{name:'海宁公安'},
					{name:'桐乡公安'},
					{name:'经开公安'},
					{name:'港区公安'},
					{name:'治安支队'},
					{name:'交警支队'},
					{name:'出入境管理局'}
				]
			}
		},
		watch:{
			['UserInfo.origin'](){
				console.log(this.UserInfo.origin)
			}
		},
		methods:{
			CheckInfo(){
				if (this.UserInfo.name==="") {
					this.ToastTest='请输入姓名'
					this.ToastShow=true
					return false
				}
				if (!this.checkMobile(this.UserInfo.tel)) {
					this.ToastTest='请输入正确的电话号码'
					this.ToastShow=true
					return false
				}
				if (this.UserInfo.content==="") {
					this.ToastTest='请输入建议'
					this.ToastShow=true
					return false
				}
				if (this.UserInfo.origin==="请选择") {
					this.ToastTest='请选择问题反馈所属'
					this.ToastShow=true
					return false
				}
				return true
			},
			checkMobile(str){
  				//移动电话校验
  				var 
				re = /^1\d{10}$/
				if (re.test(str)) {
				return true
				} else {
				return false
				}
  			},
  			SubmitAjax(){
  				this.$http.post(SubmitSuggestUrl,this.UserInfo).then((res)=>{
  					console.log(res.data)
  				})
  			},
			Submit(){
				if (this.CheckInfo()) {
					this.SubmitAjax()
				}
				
			},
			ClosePop(){
				this.PopupShow=false
			}
		},
		components:{
			Toast,
			Popup
		}
	}
</script>
<style scoped>
	.suggest{
		background: url('../../static/img/suggest_bg.jpg')no-repeat;
		padding-bottom: 1.333333rem;
	}
	.suggest-header{
		height: 1.5rem;
		line-height: 1.5rem;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
	}
	.suggest-body{
		padding:0 0.52rem;
	}
	.suggest-body-item{
		margin-bottom: 10px;
	}
	.item-name{
		font-size: 15px;
		margin-bottom: 0.133333rem;
	}
	.item-content{
		width: 100%;
	}
	.item-content input{
		width: 100%;
		height: .8rem;
		border: 0px;
		border-bottom: 1px solid #999999;
		outline: none;
		line-height: 0;
		background: none;
		padding: 0; 
	}
	.item-content textarea{
		width: 100%;
		height: 1.973333rem;
		border: 1px solid rgb(169, 169, 169);
		background: none;
		outline: none;
	}
	.item-content select{
		width: 100%;
		height: 1.2rem;
		line-height: 1.2rem;
		font-size: 14px;
		border-color: rgb(169, 169, 169);
		background: none;
	}
	.suggest-btn{
		width:4.8rem;
		height: 0.866667rem;
		line-height: 0.866667rem;
		text-align: center;
		color: #fff;
		background: #044899;
		font-size: 18px;
		margin: 30px auto;
		border-radius: 5px;
	}
	.suggest-tips{
		padding:0 0.52rem;
	}
	.suggest-tips p{
		font-size: 13px;
	}
	.popupcontent{
		position: relative;
		top: 0;
		left: 0;
		background:url('../../static/img/suggest_bg.jpg')no-repeat;;
		font-size: 13px;
		padding: 0 0.533333rem;
		padding-bottom: 2rem;
	}
	.pop-title{
		height:2.0rem;
		line-height: 2.0rem;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
	}
	.pop-first{
		margin-bottom: 0.666667rem;
	}
	.pop-second-t{
		font-size: 16px;
		margin-bottom: 0.266667rem;
	}
	.pop-second-c{
		margin-bottom: 0.666667rem;
	}
	.pop-three-t{
		font-size: 16px;
		margin-bottom: 0.266667rem;
	}
	.pop-btn{
		width: 5.066667rem;
		height: 1.066667rem;
		line-height: 1.066667rem;
		text-align: center;
		background: #044899;
		color: #fff;
		font-size: 18px;
		margin: 40px auto;
		border-radius: 5px;
	}
</style>