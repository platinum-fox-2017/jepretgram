<template>
  <div id="app" >
    <navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: mapState(['isLogin']),
  created () {
    this.checkLogin()
  },
  methods: {
    ...mapActions(['checkLogin'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  margin-top: 30px
}
</style>
