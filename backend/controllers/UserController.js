import User from "../models/User.js"
import PasswordToken from "../models/PasswordToken.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const secret = "mysecretsshhhhh"

class UserController {

  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async findUser(req, res) {
    const id = req.params.id;
    
    const user = await User.findById(id);
    if(user == undefined) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.json(user);
  }

  async create(req, res) {
    var {email, name, password} = req.body;

    try {
      var emailExists = await User.findByEmail(email)
      
      if(email == undefined || email == "" || email == ' '){
        res.status(400).send({message: "Email é obrigatório"})
        return
      }
  
      if(emailExists){
        res.status(406).send({message: "Email já cadastrado"})
        return;
      }
  
      if(password === undefined || password === ""){
        res.status(400).send({message: "Senha é obrigatório"})
        return;
      }
  
      await User.create(email, name, password)
  
      return res.status(201).send({message: "Usuário criado com sucesso"})
   
    } catch(error) {
      console.log(error)
      res.status(500).send({message: "Erro ao criar usuário"})
    }
  }

  async edit(req, res) {
    var { id, name, email, role } = req.body;
    var result = await User.update(id, name, email, role);
    if(result != undefined) {
      if(result.status) {
        return res.status(200).send({message: "Usuário atualizado com sucesso"})
      } else {
        return res.status(406).send(result.error)
      }
    } else {
      return res.status(500).send({message: "Ocorreu um erro no servidor!"})
    }
  }

  
  async recoverPassword(req, res) {
    var email = req.body.email;
    var result = await PasswordToken.create(email);
    if(result.status) {
      res.status(200).send(toString(result.token))
    } else {
      res.status(406).send(result.message)
    }
  }

  async changePassword(req, res) {
    var token = req.body.token;
    var password = req.body.password;

    var isTokenValid = await PasswordToken.validate(token)
    
    if(isTokenValid.status) {
      await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token)
      res.status(200).send({message: "Senha alterada com sucesso"})
    } else {
      res.status(406).send("Token inválido!")
    }
  }
  
  async remove(req, res) {
    var id = req.params.id;
  
    var result = await User.delete(id);
    console.log(result)
  
    if(result.status) {
      res.status(200).send(result.message)
    } else {
      res.status(406).send(result.message)
    }
  }

  async login(req, res) {
    var {email, password} = req.body;

    var user = await User.findByEmail(email);

    if(user != undefined) {
      var resultado = await bcrypt.compare(password, user.password);

      if(resultado) {
        var token = jwt.sign({email: user.email, role: user.role}, secret);
      
        return res.status(200).json({token: token});
      
      } else {
        return res.status(406).json({message: "Senha incorreta"});
      }
    
    } else {
      res.status(406);
      res.json({status: false, message: "Usuário não encontrado"});
    }
  }

}

export default new UserController();