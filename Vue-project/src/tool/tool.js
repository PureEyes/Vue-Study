import md5 from 'blueimp-md5'
export function setDate() {
	// console.log(Date.parse(new Date())-70000)
	let data=Date.parse( new Date() ).toString().substr(0,10)
	// let data=new Date().getTime()
	return data
}
export function SortParams(json){
	//排序拼接
	let arr=[]
	let str=''
	for(var key in json){
		arr.push(key)
	}
	arr.sort()
	for(let i=0;i<arr.length;i++){
		// console.log(json[arr[i]])
		str=str+json[arr[i]]
	}
	return str

}
export function upperJSONKey(jsonObj){  
    for (var key in jsonObj){  
        jsonObj["\""+key.toLowerCase()+"\""] = jsonObj[key];  
        delete(jsonObj[key]);  
    }  
    return jsonObj;  
}

export function PasswordPost(params) {

	
	let time=setDate()
	let str=SortParams(params)//参数按照顺序拼接	
	let key ='347d68177039101400d08faf58540b69'//密钥
	let sign=''
	str=str+time+key//在尾部拼接上时间戳+密钥
	sign=md5(str)//加密
	params.timestamp=time
	params.sign=sign
	return params
}