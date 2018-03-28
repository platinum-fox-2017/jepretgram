<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Jepret Gram</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isLogin">
          <router-link to="/register" class="nav-link"> Register</router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <router-link to="/me" class="nav-link"> My Post</router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <router-link to="/new-post" class="nav-link"> New Post</router-link>
        </li>
        <li class="nav-item" v-if="isLogin">
          <a class="nav-link" href="#" @click="logout" >Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'Navbar',
  data () {
    return {
      query: ''
    }
  },
  computed: mapState(['isLogin']),
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.checkLogin()
    },
    ...mapActions(['checkLogin'])
  }
}
</script>
