import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail/:movieId',
      name: 'movie-detail',
      component: () => import('./views/MovieDetail.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('./views/Favorites.vue')
    },
    {
      path: '/search/:query',
      name: 'search',
      props: true,
      component: () => import('./views/Search.vue')
    }
  ]
})
