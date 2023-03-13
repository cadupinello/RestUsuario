class HomeController{

    async index(req, res){
        res.send("APP EXPRESS! - Guia do programador");
    }

    async validateToken(req, res){
        res.send("ok");
    }

}

export default new HomeController();