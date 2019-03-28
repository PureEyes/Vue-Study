<template>
	<div class="register">
		<!-- 信息登记得到页面 -->
		<div class="register_header">
			
		</div>
		<div class="register_word">
			信息登记
		</div>
		<div class="register_form">
			<!-- <div class="register_form_select"> -->
				<select v-model="Area" class="register_form_select">
					<option :value="item.name" v-for="item in SelectList">{{item.name}}</option>
				</select>
			<!-- </div>	 -->	
			<input type="text" v-model="InputContent" class="register_form_input" placeholder="您从哪里知道嘉兴公安？（请输入）">
				
		</div>
		<div class="register_btn" @click="SubmitAjax">
			确定
		</div>
		<toast v-model="ToastShow" width="6rem" type="text">{{ToastTest}}</toast>
	</div>
</template>
<script>
import {Toast} from 'vux'
import {SubmitWhereKnowUrl} from '@/api/api'
export default{
	data(){
		return{
			InputContent:'',
			ToastShow:false,
			ToastTest:'',
			Area:'请选择您所属的地区',
			SelectList:[
					{name:'请选择您所属的地区'},
					{name:'南湖'},
					{name:'秀洲'},
					{name:'嘉善'},
					{name:'平湖'},
					{name:'海盐'},
					{name:'海宁'},
					{name:'桐乡'},
					{name:'经开'},
					{name:'港区'},
					{name:'出入境管理局'}
			]
		}
	},
	created(){

	},
	methods:{
		CheckInfo(){
			if (this.Area=='请选择您所属的地区') {
				this.ToastTest="请选择您所属的地区"
				this.ToastShow=true
				return false
			}
			if (this.InputContent=='') {
				this.ToastTest="请填写完整信息"
				this.ToastShow=true
				return false
			}
			return true
		},
		SubmitAjax(){
			if (!this.CheckInfo()) {
				return
			}
			this.$http.post(SubmitWhereKnowUrl,{area:this.Area,content:this.InputContent}).then((res)=>{
				// console.log(res.data)
				this.ToastTest="提交成功"
				this.ToastShow=true
			})
		}
	},
	components:{
		Toast
	}
}	
</script>
<style>
.register{
	background: #feda56;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.register_header{
	width: 100%;
	height:4.533333rem;
	background: url('../../static/img/register_top.png')no-repeat;
	background-size: 100% 100%; 
}
.register_word{
	color:red;
	text-align: center;
	font-size: 24px;
}
.register_form_input{
	display: block;
	width: 8.0rem;
	height: 0.933333rem;
	margin: .333333rem auto 0;
	padding-left: 0.4rem;
	font-size: 16px;
}
.register_form_select{
	display: block;
	width: 8.4rem;
	height: 0.933333rem;
	margin: 1.333333rem auto 0;
	font-size: 16px;
	color: #757575
}
.register_btn{
	width: 4.533333rem;
	height: 0.986667rem;
	line-height: 0.986667rem;
	text-align: center;
	background: #386193;
	color: #fff;
	font-size: 15px;
	margin: 1.0rem auto 0;
}
</style>