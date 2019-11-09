<template>
  <div class="wrapper">
    <portal to="actionBar">
      <div class="ui fluid center aligned"> 
        <img 
          class="ui centered image fluid logo"
          src="../../assets/join-us-white.png"
        >
      </div>
    </portal>

    <div class="ui transparent">
      <h1 class="ui header">Register</h1>
        <form class="ui form" @submit.prevent="submit">
          <div class="form-group row">
            <div class="label">
              <label>Email</label>
            </div>
            <div class="field">
              <input
                id="email"
                type="text"
                class="form-control"
                name="email"
                placeholder="E-mail"
                value
                required
                autofocus
                v-model="form.email"
              />
            </div>
          </div>

          &nbsp;

          <div class="form-group row">
            <div class="label">
              <label>Password</label>
            </div>
            <div class="field">
              <input
                id="password"
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
                required
                v-model="form.password"
                />
            </div>
          </div>

          &nbsp;

          <div id="button">
            <div class="">
              <button type="submit" class="ui button blue">Join Us!</button>
            </div>
          </div>
        </form>
        <div v-if="error" class="alert alert-danger">
          {{error}} 
        </div>
    </div>
  </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
           this.$router.push({ path: '/home'})
        })
        .catch(err => {
          this.error = err;
        })
    }
  }
};
</script>


<style scoped>
.wrapper {
  color: white;
  font-size: 100%;
  flex-direction: column;
  flex: 1;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url("../../assets/stockbrot.jpg") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display:flex
}

.ui.header {
  margin: 2em auto 0;
  color:white;
  max-width: 80%
}

.ui.form {
  color: white;
  margin-top: 3em;
  margin-bottom: 1em;
  margin-left: 2em;
  margin-right: 2em;
}

.ui.logo {
  width: 120px;
  height: 55px;
  padding: 0% 1% 1%;
}

.label {
  text-align: left;
  margin: 0 auto 1em;
}

.field {
  margin-bottom: 2em;
}

.alert.alert-danger {
  color: red;
  margin: 3em auto 0;
  max-width: 80%
}

</style>