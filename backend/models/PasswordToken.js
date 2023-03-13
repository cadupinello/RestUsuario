import knex from "../database/connection.js";
import User from "./User.js";
import crypto from "crypto";

class PasswordToken {
  async create(email) {
    try {
      const token = crypto.randomUUID();
      const user = await User.findByEmail(email);
      
      if(user != undefined) {

        await knex('password_tokens').insert({
          id: Math.floor(Math.random() * 10000),
          user_id: user.id,
          used: 0,
          token: token
        })

        return {status: true, message: "Token criado com sucesso", token: token};
      
      } else {
        return {status:false, message: "Usuário não existe!"};
      }

    } catch(error) {
      console.log(error);
      return {status:false, message: "Erro ao criar token!"};
    }
  }

  async validate(token) {
    try {
      const result = await knex('password_tokens').where({ token: token });
      
      if(result.length > 0) {
        var tk = result[0];

        if(tk.used) {
          return {status: false, message: "Token já utilizado!"};
        } else {
          return {status: true, token: tk};
        }
      } else {
        return {status:false, message: "Token inválido!"};
      }
    } catch(error) {
      console.log(error);
      return {status:false, message: "Erro ao validar token!"};
    }
  }

  async setUsed(token) {
    await knex('password_tokens').update({ used: 1 }).where({ token: token });
  }
}

export default new PasswordToken();