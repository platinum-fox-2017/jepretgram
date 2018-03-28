<template>
  <div class="container-fluid">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
            aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link to="/">
            <a class="navbar-brand">JEPRETGRAM</a>
          </router-link>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
            <li><router-link to="/">
              <!-- <a disabled>Welcome {{user.name}}</a> -->
              </router-link></li>
            <li class="active">
              <a data-toggle="modal" data-target="#myModal">Ask Question</a>
            </li>
            <li>
              <a data-toggle="modal" data-target="#logOutModal">Log Out</a>
            </li>
          </ul>
        </div>
        <!--/.nav-collapse -->
      </div>
      <!--/.container-fluid -->
    </nav>

    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Ask Question</h4>
          </div>
          <div class="modal-body">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-3 control-label">Title</label>
                <div class="col-sm-9">
                  <input class="form-control" id="focusedInput" type="text" v-model="question.title">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 control-label">Description</label>
                <div class="col-sm-9">
                  <!-- <textarea class="form-control" type="text" v-model="question.description"></textarea> -->
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <!-- <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-success pull-right" data-dismiss="modal" @click="createQuestion(question)">Post Your Question</button> -->
          </div>
        </div>
      </div>
    </div>

    <div id="logOutModal" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Confirm to log out ?</h4>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="logOut">Confirm</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        question: {
          title: '',
          description: ''
        }
      }
    },
    computed: {
      user () {
        return this.$store.getters.getUser
      }
    },
    methods: {
      logOut () {
        this.$store.dispatch('logout')
        this.$router.push('/login')
        window.location.reload()
      }
    }
  }
</script>

<style scoped>
</style>