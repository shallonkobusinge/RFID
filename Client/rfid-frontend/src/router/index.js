import Vue from 'vue'
import Router from 'vue-router'
import Table from '@/components/Table'
import { ClientTable } from 'vue-tables-2';

Vue.use(Router)
Vue.use(ClientTable)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Table',
      component: Table
    }
  ]
})
