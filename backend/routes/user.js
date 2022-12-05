const express=require("express");
const router=express.Router();
const JWT=require('jsonwebtoken');
const {verifyToken, signAccessToken}=require("../helpers/jwthelpers")
var fs=require("fs")
const dbPath=__dirname.replace("routes","")+"database/users.json"




router.post("/User",async(req,res)=>{
  
    const{user}=req.body
    let db=fs.readFileSync(dbPath)
    let dbusers=JSON.parse(db)
    let ExistingUser=dbusers.find(({username})=>username===user)
    if(ExistingUser){
       
        const token = await signAccessToken(ExistingUser)
          return res.status(201).json({token});
    }else{
        let userObj={username:user,color:""}
        let updatedData=JSON.stringify([...dbusers,userObj])
        fs.writeFile(dbPath,updatedData,async(err)=>{
            if(err) return res.status(500).send("Unable to add User")
             const token = await signAccessToken(userObj)
             return res.status(201).json({token});
           
        })

    }
    





})

router.put("/User",verifyToken,async(req,res)=>{
    let db=fs.readFileSync(dbPath)
    const{user,color}=req.body;
   
    let dbusers=JSON.parse(db)
    let ExistingUser=dbusers.findIndex(({username})=>username===user)
    
    if(ExistingUser>-1){
        let userObj={...dbusers[ExistingUser],color};
        dbusers.splice(ExistingUser,1,userObj)
       

       
       fs.writeFile(dbPath,JSON.stringify(dbusers),async(err)=>{
            if(err) return res.status(500).send("Unable to add User")
             const token = await signAccessToken(dbusers[ExistingUser])
             return res.status(201).json({token});
    })
    }else{
        return res.status(200).send("User Not found")
        }

    })


module.exports=router