import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
let url = 'http://localhost:3004/api'

export const store = new Vuex.Store({
  state: {
    users: []
  },
  getters: {
    getUser (state) {
      return state.users
    }
  },
  mutations: {
    // mutUsers
    signUp (state, payload) {
      state.users.push(payload)
      console.log('mut/ signUp/ payload : ', payload)
    },
    login (state, payload) {
      console.log('mut/ login/ payload : ', payload)
      localStorage.setItem('tokenJWT', payload.tokenJWT)
      localStorage.setItem('name', payload.name)
      state.user.tokenJWT = payload.tokenJWT
      state.user.name = payload.name
    },
    logout (state) {
      localStorage.clear()
      state.token = null
      state.user = null
    }
  },
  actions: {
    // actUsers
    signUp ({commit}, payload) {
      console.log('act/ signUp/ payload : ', payload)
      commit('signUp', payload)
      axios.post(`${url}/users/signup`, {
        email: payload.email,
        password: payload.password,
        name: payload.name
      })
        .then(data => {
          console.log('act/ signUp/ data : ', data)
          commit('signUp', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    login ({commit}, payload) {
      axios.post(`${url}/users/login`, {
        email: payload.email,
        password: payload.password
      })
        .then(({
          data
        }) => {
          console.log('act/ login/ data : ', data)
          console.log('act/ signUp/ data.user : ', data.user)
          commit('login', data)
          // window.location.href = '/'
        })
        .catch(err => {
          console.log('login error', err)
        })
    },
    logout ({commit}, payload) {
      commit('logout')
    }
  }
})
