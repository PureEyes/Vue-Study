// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.use(Vuex)
Vue.use(VueResource)
import {PasswordPost} from '@/tool/tool'

Vue.use(VueLazyload,{
	loading:'./static/img/lazyloading.jpg',
	error:'./static/img/lazyloading.jpg'
})
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true
FastClick.attach(document.body)

Vue.http.interceptors.push((request, next) => {

	
	if (request.method === 'POST') {
	    if (request.body==undefined) {
	        request.body={}
	    }

	    request.body=PasswordPost(request.body)
	    
	}

	next((response) => {
		 if (response.status == 200) {

		 }
	});

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
