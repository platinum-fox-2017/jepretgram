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
      <div class="card"  :key="index" v-for="(post, index) in posts">
        <img class="card-img-top" :src="post.photo" alt="Card image cap">
        <div class="card-body">
          <p class="card-title">{{ post.caption}}</p>
          <p class="card-text">{{ post.user.email}}{{ post.user.name}}</p>
        </div>
        <div class="card-body">
          <button type="button" class="btn btn-outline-success">{{ post.likes.length}} people like this</button>
        </div>
        <div class="card-body">
          <button class="card-link btn btn-primary">Like This</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  created () {
    this.getPosts()
  },
  computed: mapState(['posts', 'loading']),
  methods: {
    ...mapActions(['getPosts'])
  }
}
</script>
