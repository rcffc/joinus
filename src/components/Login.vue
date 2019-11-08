<template>
  <div class="wrapper">
    <div class="ui transparent">
      <div class="ui header">Log In</div>
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
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          this.$router.push({ path: '/home'});
        })
        .catch(err => {
          this.error = err;
          console.log(this.error)
        })
        .reject(this.error);
    }
  }
};
</script>


<style scoped>
.wrapper {
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
  color: white;
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

.alert.alert-danger {
  color: black
}
</style>