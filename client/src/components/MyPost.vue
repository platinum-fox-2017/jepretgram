<template>
  <div >
    <h1 class="text-center">The Best of Me</h1>
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <spinner v-if="loading" message="Loading Posts.." ></spinner>
        <div class="card"  :key="index" v-for="(post, index) in myPosts">
          <img class="card-img-top" :src="post.photo" alt="Card image cap">
          <div class="card-body">
            <p class="card-title" v-if="!post.isEdit">{{ post.caption}}</p>
            <input type="text" class="card-title form-control" v-model="post.caption" name="" value="" v-if="post.isEdit">
            <p class="card-text">{{ post.user.email}}{{ post.user.name}}</p>
          </div>
          <div class="card-body">
            <button type="button" class="btn btn-outline-success">{{ post.likes.length}} people like this</button>
          </div>
          <div class="card-body">
            <button v-if="!post.isEdit" class=" btn btn-danger" @click="deletePost(post._id)">Delete</button>
            <button v-if="!post.isEdit" class="btn btn-warning" @click="editCaption(index)"  >Edit </button>
            <button v-if="post.isEdit" class="card-link btn btn-primary" @click="updateCaption(index)"  >Update </button>
            <button v-if="post.isEdit" class="card-link btn btn-danger" @click="cancelCaption(index)"  >Cancel </button>
          </div>
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
    cancelCaption (post) {
      this.myPosts[post].isEdit = false
    },
    editCaption (post) {
      this.myPosts[post].isEdit = true
    },
    updateCaption (post) {
      const id = this.myPosts[post]._id
      const app = this
      const caption = this.myPosts[post].caption
      this.$http.put(`/posts/${id}`, { caption }, {headers: {token: localStorage.token}}).then(res => {
        app.cancelCaption(post)
      }).catch(err => console.log(err))
    },
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
