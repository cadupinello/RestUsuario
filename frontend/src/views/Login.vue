<template>
  <div>
    <h2>Login de usuarios</h2>
    <hr>
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined" class="message is-danger">
          <p class="message-body">{{error}}</p>
        </div>
        <label>Email:</label>
        <input type="email" placeholder="email@email.com" class="input" v-model="email">
        <label>password:</label>
        <input type="password" placeholder="******" class="input" v-model="password">
        <hr>
        <button class="button is-success" @click="login">Logar</button>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      email: '',
      password: '',
      error: undefined,
    }
  },
  methods: {
    login() {
      axios.post("http://localhost:8686/login", {
        email: this.email,
        password: this.password
      }).then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
        this.$router.push({ name: 'home' })
      }).catch(err => {
        var msgErro = err.response.data.message;
        this.error = msgErro;
        setTimeout(() => {
          this.error = undefined;
        },[2000]);
      })
      
    }
  }
}
</script>

<style>

</style>