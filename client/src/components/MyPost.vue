<template>
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">All  Posts </li>
        </ol>
      </nav>
      <spinner v-if="loading" message="Loading Posts.." ></spinner>
      <div class="card"  :key="index" v-for="(post, index) in myPosts">
        <img class="card-img-top" :src="post.photo" alt="Card image cap">
        <div class="card-body">
          <p class="card-title">{{ post.caption}}</p>
          <p class="card-text">{{ post.user.email}}{{ post.user.name}}</p>
        </div>
        <div class="card-body">
          <button class="card-link btn btn-danger" @click="deletePost(post._id)">Delete</button>
          <button class="card-link btn btn-warning" >Edit </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'MyPost',
  data () {
    return {
    }
  },
  created () {
    this.getMyPosts()
  },
  computed: mapState(['myPosts', 'loading']),
  methods: {
    ...mapActions(['getMyPosts']),
    deletePost (id) {
      const app = this
      this.$http.delete(`/posts/${id}`, {headers: {token: localStorage.token}}).then(res => {
        app.getMyPosts()
      }).catch(err => console.log(err))
    }
  }
}
</script>
<style media="screen">
  .card {
    margin-bottom: 30px
  }
</style>
