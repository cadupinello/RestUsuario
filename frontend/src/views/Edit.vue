<template>
  <div>
    <h2>Edit de usuarios</h2>
    <hr>
    <div class="columns is-centered">
      <div class="column is-half">
        <div v-if="error != undefined" class="message is-danger">
          <p class="message-body">{{error}}</p>
        </div>
        <label>Nome:</label>
        <input type="text"  class="input" v-model="name">
        <input type="email" class="input" v-model="email">
        <hr>
        <button class="button is-success" @click="update" >Editar</button>
        <router-link :to="{name: 'Users'}" class="button is-secondary ml-2">Voltar</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  created() {

    var req = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }
    
    axios.get('http://localhost:8686/user/' + this.$route.params.id, req).then(res => {
      this.name = res.data.name
      this.email = res.data.email
      this.id = res.data.id
    
    }) .catch(err => {
      this.$router.push({name: 'Users'})
    })

  },
  data() {
    return {
      name: '',
      email: '',
      id: -1,
      error: undefined,
    }
  },
  methods: {
    update() {

      var req = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      
      axios.put("http://localhost:8686/user/", {
        name: this.name,
        email: this.email,
        id: this.id
      }, req).then(res => {
        console.log(res)
        this.$router.push({ name: 'Users' })
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