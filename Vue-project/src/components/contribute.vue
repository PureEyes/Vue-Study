<template>
<!-- 上传投稿文件页面 -->
	<div class="contribute">
		<div class="contribute_header">
			
		</div>
		<div class="contribute_body">
			<div class="contribute_item">
				<div class="contribute_item_key">姓名:</div>
				<input class="contribute_item_value" v-model="UserInfo.name"/>
			</div>
			<div class="contribute_item">
				<div class="contribute_item_key">单位:</div>
				<input class="contribute_item_value" v-model="UserInfo.department"/>
			</div>
			<div class="contribute_item">
				<div class="contribute_item_key">电话:</div>
				<input class="contribute_item_value" v-model="UserInfo.tel"/>
			</div>
			<div class="contribute_upload_w">
				<div class="contribute_upload">
					投稿文件上传
					<!-- <input type="file" class="contribute_upload_input" id="file" @change="Uploadfile()" accept=".docx,.doc,.txt,.pdf" ref="file"> -->
					<input type="file" class="contribute_upload_input" id="file" @change="Uploadfile()" ref="file">
				</div>
			</div>
			
		</div>
		<div class="contribute_submit">
			<div class="contribute_btn" @click="SubmitInfo">提交</div>
		</div>
		<div class="contribute_bottom"></div>
		<toast v-model="ToastShow" width="6rem" type="text">{{ToastTest}}</toast>
		<loading v-show="LoadingShow" :text="LoadingWord"></loading>    
	</div>
</template>
<script>
import {Toast,Loading} from 'vux'
import {ConArticleUrl,UploadfileUrl} from '@/api/api'
export default{
	data(){
		return{
			ToastShow:false,
			ToastTest:'',
			LoadingShow:false,
            LoadingWord:' ',
			UserInfo:{
				name:'',
				department:'',
				tel:"",
				column_name:'',
				file_name:'',
				file_path:''
			}
		}
	},
	components:{
		Toast,
		Loading
	},
	methods:{
		Uploadfile(){
			let str=this.$refs.file.files[0].name
			let arr=str.split('.')
			let type=arr[arr.length-1]
			console.log(type)
			if (type!='docx'&&type!='doc'&&type!='txt'&&type!='pdf') {
				this.ToastTest='请上传正确的文件格式'
				this.ToastShow=true
				return
			}
			let formData = new FormData()
			formData.append('file',this.$refs.file.files[0])
			this.LoadingShow=true
			this.$http.post(UploadfileUrl,formData).then((res)=>{
					this.LoadingShow=false
					if (res.data.code===0) {
						this.ToastTest='上传成功'
						this.ToastShow=true
						this.UserInfo.column_name=res.data.data.column_name
  						this.UserInfo.file_name=res.data.data.file_name
  						this.UserInfo.file_path=res.data.data.file_path
					}else{
						this.ToastTest=res.data.reason
						this.ToastShow=true
					}
  					
  			})
		},
		SubmitInfo(){
			if (this.CheckInfo()) {
				this.LoadingShow=true
				this.$http.post(ConArticleUrl,this.UserInfo).then((res)=>{
					this.LoadingShow=false
  					if (res.data.code===0) {
  						this.ToastTest='提交成功'
						this.ToastShow=true
  					}
  				})
			}
		},
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
			if (this.UserInfo.department==="") {
				this.ToastTest='请输入单位'
				this.ToastShow=true
				return false
			}
			if (this.UserInfo.column_name===""||this.UserInfo.file_name===""||this.UserInfo.file_path==="") {
				this.ToastTest='请上传投稿文件'
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
	}
}
</script>
<style scoped>
.contribute{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.contribute_header{
	background:url(../../static/img/article_header.png)no-repeat;
	background-size: 100% 100%;
	width: 100%;
	height: 4.373333rem; 
}
.contribute_body{
	padding:0 0.533333rem;
	/*margin-top: 0.5rem;*/
}
.contribute_item{
	padding: 0.266667rem 0;
	/*display:flex;
	align-items: center;*/
}
.contribute_item_key{
	font-size: 14px;
	display: block;
	width: 1.6rem;
	color: #000;
	padding-bottom:0.2rem;
}
.contribute_item_value{
	width: 7.666667rem;
	height: 0.8rem;
	line-height: 0.8rem;
	border:1px solid #999;
	border-radius: 5px;
	display: block;
	outline: none;
	padding: 0 0.4rem;
}
.contribute_upload_w{
	margin-top: 0.3rem;
}
.contribute_upload{
	position: relative;
	width:6.733333rem;
	height: 1.133333rem;
	line-height: 1.133333rem;
	background: #ff9c00;
	color: #fff;
	text-align: center;
	margin: 0 auto;
	font-size: 16px;
}
.contribute_upload_input{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.contribute_submit{
	margin-top: 0.266667rem;
}
.contribute_btn{
	text-align: center;
	width:6.733333rem;
	height: 1.133333rem;
	line-height: 1.133333rem;
	background: #d42a23;
	color: #fff;
	margin:0 auto;
	font-size: 16px;
}
.contribute_bottom{
	width: 100%;
	height: 1.413333rem;
	background: url(../../static/img/article_bottom.png)no-repeat;
	background-size: 100%;
	position: absolute;
	bottom: 0;
	left: 0;
}	
</style>