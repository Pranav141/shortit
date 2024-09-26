const express=require("express");
const auth = require("../middlewares/auth");
const Url = require("../models/url.model");
const validateUrl = require("../util/validateUrl");
// const { nanoid } = require("nanoid");
const generateId = require("../util/generateId");
const router=express.Router();

// router.get('/url/create',(req,res)=>{
//     res.send("hello world");
// })

router.post('/url/create',auth,async (req,res)=>{
    // res.send("hello world");
    const longurl=req.body.url;
    const user=req.user;
    console.log(user._id);
    
    const url=await Url.findOne({userId:user._id,originalUrl:longurl});
    if(url){
        console.log("already exists");
        
        res.status(201).send({url:url,message:"Url already exists"});
    }
    else{
        try{
            if(!validateUrl(longurl)){
                return res.status(400).send({message:"Invalid url"});
            }
            const shortUrl=await generateId(8);
            const newUrl=new Url({
                userId:user._id,
                originalUrl:longurl,
                hashedUrl:shortUrl,
                analytics:[{
                    date:new Date().toLocaleDateString(),
                    visits:0
                }],
            });
            newUrl.save();
            res.status(200).send({url:newUrl,message:"Url created"});
        }
        catch(error){ 
            res.status(500).send({message:"Internal server error",error:error.message});
        }
    }
})

router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        const url=await Url.findOne({hashedUrl:id});
        if(url && url.isEnabled){
            let flag=0;

            for(let i=0;i<url.analytics.length;i++){
                if(url.analytics[i].date===new Date().toLocaleDateString()){
                    url.analytics[i].visits=url.analytics[i].visits+1;
                    flag=1;
                    break;
                }
            }
            if(flag===0){
                url.analytics.push({
                    date:new Date().toLocaleDateString(),
                    visits:1
                });
            }
            url.totalVisits=url.totalVisits+1;
            // url.updatedAt=new Date.now();
            url.save();
            res.status(200).send(url.originalUrl);
        }
        else{
            res.status(404).send({message:"Url not found/expired"});
        } 
    } catch (error) {
        res.status(500).send({message:"Internal server error",error:error.message});    
    }
}
)

router.put('/url/:id',auth,async(req,res)=>{
    try{
        const id=req.params.id;
        const user=req.user;
        const url=await Url.findOne({_id:id});
        if(url){
        url.isEnabled=!url.isEnabled;
        url.save();
        res.status(200).send({url,message:"Url updated"});
        }
        else{
            res.status(404).send({message:"Url not found"});
        }
    }
    catch(error){
        res.status(500).send({message:"Internal server error",error:error.message});
    }
})

router.delete('/url/:id',auth,async(req,res)=>{
    try{
        const id=req.params.id;
        const user=req.user;
        const url=await Url.findOneAndDelete({_id:id});
        if(url){
            // url.remove();
            res.status(200).send({message:"Url deleted"});
        }
        else{
            res.status(404).send({message:"Url not found"});
        }
    }catch(error){
        res.status(500).send({message:"Internal server error",error:error.message});
    }
})

router.get('/url/:id/analytics',auth,async(req,res)=>{
    try{
        const id=req.params.id;
        const user=req.user;
        const url=await Url.findOne({_id:id});
        if(url){
            res.status(200).send({url:url});
        }
        else{
            res.status(404).send({message:"Url not found"});
        }
    }catch(error){
        res.status(500).send({message:"Internal server error",error:error.message});
    }
});
module.exports=router;