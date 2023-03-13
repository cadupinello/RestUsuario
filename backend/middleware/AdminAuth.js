import jwt from "jsonwebtoken"

const secret = "mysecretsshhhhh"

const AdminAuth =  (req, res, next) => {
  const authToken = req.headers['authorization']

  if (authToken != undefined) {
    const bearer = authToken.split(' ')
    const token = bearer[1]

    try {

      var decoded = jwt.verify(token, secret)

      if(decoded.role == 1) {
        next();
      } else {
        res.status(401).send({message: "Você não tem permissão para isso!"});
      }
    
    } catch (error) {
      res.status(401).send({message: "Você não está autenticado"});
    }

  } else {
    res.status(401).send({ message: "Não autorizado" })
    return
  }
}

export default AdminAuth
