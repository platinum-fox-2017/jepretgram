<template>
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <h2>Register</h2>
      <div class="alert alert-danger" v-if="isEmailDouble"><b>Email has been used</b>, try another email</div>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1"  v-model="user.email" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input type="text" class="form-control" id="exampleInputEmail1" v-model="user.name" aria-describedby="emailHelp" placeholder="Enter Name">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" v-model="user.password" placeholder="Password">
        </div>
        <button type="button"  @click="saveForm" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      user: {
        email: '',
        name: '',
        password: ''
      },
      isEmailDouble: false
    }
  },
  methods: {
    ...mapActions(['checkLogin']),
    saveForm () {
      const app = this
      this.$http.post('/users/register', this.user).then(function (res) {
        localStorage.setItem('token', res.data.token)
        app.checkLogin()
        app.$router.push('/')
      }).catch(function (err) {
        console.log(err)
        if (err) {
          if (err.response.status === 400) {
            app.isEmailDouble = true
          }
        }
      })
    }
  }
}
</script>
