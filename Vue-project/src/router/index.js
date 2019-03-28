import Vue from 'vue'
import Router from 'vue-router'

const Index = resolve => require(['@/components/index'], resolve)
const RunOne = resolve => require(['@/components/runone'], resolve)
const Service = resolve => require(['@/components/service'], resolve)
const Suggest = resolve => require(['@/components/suggest'], resolve)
const RunOneChild = resolve => require(['@/components/runonechild'], resolve)
const RunOneVideo = resolve => require(['@/components/runonevideo'], resolve)
const RunOnehouse = resolve => require(['@/components/runonehouse'], resolve)
const RunOnepopulation = resolve =>
  require(['@/components/runonepopulation'], resolve)
const register = resolve => require(['@/components/register'], resolve)
const article = resolve => require(['@/components/article'], resolve)
const contribute = resolve => require(['@/components/contribute'], resolve)
const nSub = resolve => require(['@/components/n-sub'], resolve)
const nNews = resolve => require(['@/components/n-news'], resolve)
const nSpecail = resolve => require(['@/components/n-specail'], resolve)

const specail = resolve => require(['@/components/specail'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/nSpecail',
      component: nSpecail
    },
    {
      path: '/nSub',
      component: nSub
    },
    {
      path: '/',
      component: Index
    },
    {
      path: '/specail',
      component: specail
    },
    {
      path: '/runone',
      component: RunOne
    },
    {
      path: '/runonechild',
      component: RunOneChild
    },
    {
      path: '/runonevideo',
      component: RunOneVideo
    },
    {
      path: '/service',
      component: Service
    },
    {
      path: '/suggest',
      component: Suggest
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/runonehouse',
      component: RunOnehouse
    },
    {
      path: '/runonepopulation',
      component: RunOnepopulation
    },
    {
      path: '/article',
      component: article
    },
    {
      path: '/contribute',
      component: contribute
    },
    {
      path: '/nNews',
      component: nNews
    }
  ]
})
