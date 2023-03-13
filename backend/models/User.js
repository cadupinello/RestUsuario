import knex from '../database/connection.js';
import bcrypt from 'bcrypt';
import PasswordToken from './PasswordToken.js';

class User {

  async findAll() {
    try {
      const result = await knex('users').select(["id", "name", "email", "role"]);
      return result;
    } catch(error) {
      console.log(error);
      return [];
    }
  }

  async findById(id) {
    try {
      const result = await knex('users').select(["id", "name", "email", "role"]).where('id', id);
      
      if(result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch(error) {
      console.log(error);
      return undefined;
    }
  }

  async findByEmail(email) {
    try {
      const result = await knex.select(["id", "email", "role", "password", "name"]).from("users").where({ email: email });

      if(result.length > 0) {
        
        return result[0];

      } else {
        return false;
      }
    } catch(error) {
      console.log(error);
      return false;
    }
  }

  async create(email, name, password) {

    try {
      const hash = bcrypt.hashSync(password, 10);
      
      knex('users').insert({
        id: Math.floor(Math.random() * 10000),
        name: name.toLowerCase(),
        email: email,
        password: hash,
        role: 0
      }).then(() => {
        console.log('Usuário criado com sucesso');
      })

    } catch (error) {
      console.log(error);
      return
    }
  }

  async update(id, name, email, role) {
    try {
      const user = await this.findById(id);

      if(user != undefined) {
        var editUser = {}

        if(name != undefined) {
          editUser.name = name.toLowerCase();
        }

        if(email != undefined) {
          if(email != user.email) {
            var result = await this.findByEmail(email);
            if(result == false) {
              editUser.email = email;
            } else {
              return {status: false, error: "O e-mail já está cadastrado"};
            }
          }
        }

        if(role != undefined) {
          editUser.role = role;
        }

        try {
          await knex('users').where('id', id).update(editUser);
          return {status: true, message: "Usuário atualizado com sucesso"};
        
        } catch(error) {
          console.log(error);
          return {status: false, message: "Não foi possível atualizar o usuário"};
        }

      } else {
        return {status: false, message: "O usuário não existe!"}
      }

    } catch (error) {
      console.log(error);
      return
    }
  }

  async changePassword(newPassword, id, token) {
    var hash = await bcrypt.hashSync(newPassword, 10);
    await knex('users').where('id', id).update({password: hash});
    await PasswordToken.setUsed(token);
  }

  async delete(id) {
    var user = await this.findById(id);
    if(user != undefined) {
      try {
        await knex('users').where('id', id).delete();
        return {status: true, message: "Usuário deletado com sucesso"};
      } catch(error) {
        console.log(error);
        return {status: false, message: "Não foi possível deletar o usuário"};
      }
    } else {
      return {status: false, message: "O usuário não existe!"}
    }
  }

 
}

export default new User();