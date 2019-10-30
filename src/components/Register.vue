<template>
  <div class="wrapper">
    <div class="ui transparent">
      <div class="ui header" v-if="this.$route.path.endsWith('login')">Log In</div>
      <div class="ui header" v-if="this.$route.path.endsWith('register')">Register</div>
        <div v-if="error" class="alert alert-danger">{{error}}</div>
          <form class="ui form">
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
        name: "",
        email: "",
        password: ""
      },
      error: null
    };
  },
  methods: {
    submit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.form.name
            })
            .then(() => {});
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>


<style scoped>
.wrapper {
  color: white;
  font-size: 16px;
  flex-direction: column;
  flex: 1;
  text-align: center;
  background: url("../../assets/stockbrot.jpg") no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display:flex
}

.ui.header {
  font-size: 2em;
  margin-top: 100px;
}

.ui.form {
  margin-top: 5em;
  margin-bottom: 1em;
  margin-left: 2em;
  margin-right: 2em;
}
.label {
  text-align: left;
  margin-bottom: 10px;
}

.field {
  margin-bottom: 2em;
}

</style>