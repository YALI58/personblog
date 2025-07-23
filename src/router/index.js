import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import PostDetail from '../views/PostDetail.vue'
import Tags from '../views/Tags.vue'
import Categories from '../views/Categories.vue'
import Timeline from '../views/Timeline.vue'
import Search from '../views/Search.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/post/:id',
    name: 'PostDetail',
    component: PostDetail,
    props: true
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Tags
  },
  {
    path: '/tags/:tag',
    name: 'TagDetail',
    component: Tags,
    props: true
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/categories/:category',
    name: 'CategoryDetail',
    component: Categories,
    props: true
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: Timeline
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    props: route => ({ query: route.query.q })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 