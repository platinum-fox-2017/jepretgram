import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import NewPost from '@/components/NewPost'
import MyPost from '@/components/MyPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        const token = localStorage.token
        if (token === undefined) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/me',
      name: 'MyPost',
      component: MyPost,
      beforeEnter: (to, from, next) => {
        const token = localStorage.token
        if (token === undefined) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/new-post',
      name: 'NewPost',
      component: NewPost,
      beforeEnter: (to, from, next) => {
        const token = localStorage.token
        if (token === undefined) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      beforeEnter: (to, from, next) => {
        const token = localStorage.token
        if (token === undefined) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})
