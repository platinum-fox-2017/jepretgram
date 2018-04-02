import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Use Notify

let host = 'http://localhost:3000'
if (location.hostname !== 'localhost') {
  host = 'http://jepretgram-api.geekosta.com'
}
const request = axios.create({ baseURL: host })

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isLogin: false,
    posts: [],
    myPosts: [],
    loading: false
  },
  mutations: {
    loginState (state, payload) {
      state.isLogin = payload
    },
    postState (state, payload) {
      payload.map(data => {
        data.comment = ''
        return data
      })
      state.posts = payload.reverse()
    },
    myPostState (state, payload) {
      payload.map(data => {
        data.isEdit = false
        return data
      })
      state.myPosts = payload.reverse()
    },
    loadingState (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    checkLogin (context) {
      const token = localStorage.token
      if (token) {
        context.commit('loginState', true)
      } else {
        context.commit('loginState', false)
      }
    },
    getPosts (context) {
      context.commit('loadingState', true)
      request.get('/posts').then(res => {
        context.commit('postState', res.data.data)
        context.commit('loadingState', false)
      }).catch(err => {
        console.log(err)
      })
    },
    getMyPosts (context) {
      context.commit('loadingState', true)
      request.get('/posts/me', { headers: { token: localStorage.token } }).then(res => {
        context.commit('myPostState', res.data.data)
        context.commit('loadingState', false)
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
export default store
