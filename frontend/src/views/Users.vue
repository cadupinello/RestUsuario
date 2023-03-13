<template>
  <div>
    <h2 class="mt-5">Painel adm</h2>
    <hr>
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{user.name}}</td>
              <td>{{user.email}}</td>
              <td>{{ $filters.processRole(user.role) }}</td>
              <td> 
                <router-link :to="{name: 'EditUser', params: {id: user.id}}" class="button is-primary is-small">Editar</router-link> |
                <button class="button is-danger is-small" @click="showModalUser(user.id)">Excluir</button>
              </td>
            </tr>
        </tbody>
      </table>

      <div :class="{modal: true, 'is-active': showModal}">
        <div  class="modal-background"></div>
          <div class="modal-content">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <strong>Você quer realmente deletar este usúario?</strong>
                </div>
              </div>
              <footer class="card-footer">
                <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
                <a href="#" class="card-footer-item" @click="deleteUser()">Deletar</a>
              </footer>
            </div>
            
          </div>
          <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
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

    axios.get("http://localhost:8686/user", req).then(res => {
      this.users = res.data;
      
    }).catch(err => {
      console.log(err);
    })
  },
  data() {
    return {
      users: [],
      showModal: false,
      userId: -1,
    }
  },
  methods: {
    hideModal() {
      this.showModal = false;
    },
    showModalUser(id) {
      this.userId = id;
      this.showModal = true;
    },
    deleteUser() {
      var req = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }
      axios.delete("http://localhost:8686/user/" + this.userId, req).then(res => {
        this.users = this.users.filter(user => user.id != this.userId);
        this.showModal = false;
        console.log(res);
      }).catch(err => {
        console.log(err);
        this.showModal = false;
      })
      
    }
  },

}
</script>

<style>

</style>