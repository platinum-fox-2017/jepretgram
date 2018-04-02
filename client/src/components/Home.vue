<template>
  <div  >
    <h1 class="text-center">Photos From The Universe</h1>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <spinner v-if="loading" message="Loading Posts.." ></spinner>
        <div class="card"  :key="index" v-for="(post, index) in posts">
          <img class="card-img-top" :src="post.photo" alt="Card image cap">
          <div class="card-body">
            <button type="button" @click="likePost(index)" class="btn btn-outline-success">{{ post.likes.length}} people like this</button>
          </div>
          <div class="card-body">
            <p class="card-title"><b>{{ post.user.name}}</b> {{ post.caption}}</p>
            <p class="card-text" v-for="(com, index) in post.comments" :key="index"><b>{{ com.user.name }}</b> {{ com.comment }}</p>
          </div>
          <div class="card-body">
            <input type="text" class="form-control" v-model="post.comment" placeholder="Give Comment Here">
            <button type="button" style="margin-top:10px" @click="giveComment(index)" class="btn btn-outline-warning btn-block">Give Comment</button>
          </div>
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
    giveComment (post) {
      const id = this.posts[post]._id
      const comment = this.posts[post].comment
      const app = this
      if (localStorage.token) {
        this.$http.post(`/comments/`, {post: id, comment}, {headers: {token: localStorage.token}}).then(res => {
          app.getPosts()
        }).catch(err => console.log(err))
      } else {
        this.$router.push('/login')
      }
    },
    likePost (post) {
      const id = this.posts[post]._id
      const app = this
      if (localStorage.token) {
        this.$http.put(`/posts/${id}/like`, { }, {headers: {token: localStorage.token}}).then(res => {
          if (res.data.message !== 'Cannot Like your own photo') {
            app.getPosts()
          }
        }).catch(err => console.log(err))
      } else {
        this.$router.push('/login')
      }
    },
    ...mapActions(['getPosts'])
  }
}
</script>
<style media="screen">
  .card {
    margin-bottom: 10px;
  }
</style>
