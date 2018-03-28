<template>
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <h2>Login</h2>
      <div class="alert alert-danger" v-if="formFail"> <b>User Not Found!</b> Wrong username or password</div>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1"  v-model="user.email" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
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
        password: ''
      },
      formFail: false
    }
  },
  methods: {
    ...mapActions(['checkLogin']),
    saveForm () {
      const app = this
      this.$http.post('/users/signin', this.user).then(function (res) {
        localStorage.setItem('token', res.data.token)
        app.checkLogin()
        app.$router.push('/')
      }).catch(function (err) {
        if (err) {
          if (err.response.status === 403) {
            app.formFail = true
          }
        }
      })
    }
  }
}
</script>
