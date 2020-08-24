import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
let layout = require('../components/Layout').default;
let homePage = require('../components/pages/home').default;
let dishPage = require('../components/pages/dish').default;
let dishCreate = require('../components/pages/dishCreate').default;
let dishEdit = require('../components/pages/dishEdit').default;
let Setting = require('../components/pages/Setting').default;

export default new Router({
  routes: [
    {
      path: '',
      component: layout,
      children: [
        {
          path: '/',
          name: 'home-page',
          component: homePage
        },
        {
          path: '/dishes',
          name: 'dish-page',
          component: dishPage
        },
        {
          path: '/dish-create',
          name: 'dish-new',
          component: dishCreate
        },
        {
          path: '/dish-edit',
          name: 'dish-edit',
          component: dishEdit
        },
        {
          path: '/setting',
          name: 'setting-page',
          component: Setting
        },
      ]
    },
    
    {
      path: '*',
      redirect: '/'
    }
  ]
})
