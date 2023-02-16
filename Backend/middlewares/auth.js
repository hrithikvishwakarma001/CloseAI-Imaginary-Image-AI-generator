import jwt from 'jsonwebtoken'

function authorization(req,res,next){
   try{
    const {token}=req.body;
    if(!token){
        return res.send({"msg":"You have to login first"})
    }
    jwt.verify(token, "shhh", async function (err, decoded) {
      
        let id=decoded.id;
        
        req.user={id};
        next()
    })
   }catch(err){
    res.send({"msg":"You have to login first"})
   }
}

export {authorization}