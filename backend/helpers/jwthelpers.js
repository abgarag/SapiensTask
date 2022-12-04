const JWT=require('jsonwebtoken');
const secret=process.env.ACCESS_TOKEN_SECRET
const signAccessToken=(data)=>{
return new Promise((resolve,reject)=>{
   JWT.sign(data,secret,
        {
          expiresIn: "2h",
        }, function(err, token) {
            if(err){
                res.status(500).send("Unable to generate Token")   
            }
            resolve(token)
          });
    }
    )
}

const verifyToken=(req,res,next)=>{
    const token=req.headers["authorization"].includes("Bearer")?
    req.headers["authorization"].split(" ")[1]:null
    if(!token){
        return res.status(403).send("A token is required for authentication")
    }
   try{
    JWT.verify(token,secret)
    return next()
   }catch(err){
    if(err.message==="jwt expired"){
        return res.status(403).send("Token expired") 
    }
   }
}

module.exports={signAccessToken,verifyToken}