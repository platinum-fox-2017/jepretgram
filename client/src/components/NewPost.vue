<template>
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <div class="form-group">
          <label for="alamat">Caption:</label>
          <input type="text" name="name" id="name" v-model="post.caption" value="" class="form-control" />
        </div>
        <div class="form-group">
          <label for="photo">Photo:</label>
          <input type="file" name="photo" id="photo" value="" class="form-control" />
        </div>
        <button type="button" @click="addPost" class="btn btn-primary" >Create New Post</button>
      </div>
      <div class="col-md-8">
          <spinner v-if="loading"></spinner>
      </div>
    </div>
</template>
<script >
export default {
  data () {
    return {
      post: {
        name: '',
        photo: ''
      },
      loading: false

    }
  },
  methods: {
    addPost: function () {
      const fileInput = document.querySelector('#photo')
      const formData = new FormData()
      this.loading = true
      formData.append('photo', fileInput.files[0])
      formData.append('caption', this.post.caption)
      this.$http.post('/posts', formData, { headers: { token: localStorage.token } }).then(res => {
        this.loading = false
        this.clearForm()
        fileInput.value = ''
      }).catch(err => {
        console.log(err)
      })
    },
    clearForm: function () {
      this.post = {
        name: '',
        price: '',
        photo: ''
      }
    }
  }
}
</script>
