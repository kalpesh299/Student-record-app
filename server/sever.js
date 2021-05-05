const dotenv = require('dotenv');
const mongoose = require('mongoose')
const express = require ('express');
const app= express();
app.use(express.json());

dotenv.config({path:'./config.env'})

const DB=process.env.DATABASE
const PORT=process.env.PORT



mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false}).then(()=>{
      console.log('connection is succeessfull')
}).catch((err)=>{console.log('err')})


const studentschema = mongoose.Schema({
  name :{
            type:String,
            require:true  },
     place:{
            type:String,
            require:true
      } ,
      phoneNo:{
            type:Number,
            require:true,
           
      }  
})

const Student = new mongoose.model('student',studentschema);



app.get('/student',async(req,res)=>{
     
     
     
      // Student.find().then((result)=>{
      //       console.log(result)
      //       res.status(200).send(result)
      // }).catch((err)=>{
      //       res.status(500).send(err)
      // })
//      let {name}=req.query
      const name=req.query.name
      try {
             if(!name){
                  
                  const studentdata= await Student.find();
                  res.status(200).json({
                        result:studentdata
                  }) 
             }else{
                  const studentdata= await Student.find({name:name})
                  res.status(200).json(studentdata)
             }


           
      }
      catch(err){
            res.status(500).json({msg:"data fetching problem"})
      }
})
app.get('/student/:id',async(req,res)=>{
     
     const id = req.params.id;
     try{
      const studenget= await Student.find({_id:id});
      res.status(200).json({
            result:studenget
      })
    }catch{
          res.status(500).json({msge:"err"})
    }




})
app.put('/student/:id',async(req,res)=>{
      const {name,place,phoneNo} = req.body;
      const id =req.params.id;
      
      try{
         const updatestudent = await Student.update({_id:id},{$set:{name:name,place:place,phoneNo:phoneNo}})
         res.status(200).json({result:updatestudent})
      }catch{
        res.status(500).json({msg:"err"})
      }
     
      // const {name,place,phoneNo} = req.body;
      //  const id =req.params.id;
      // Student.update({_id:id},{$set:{name:name,place:place,phoneNo:phoneNo}})
      // .then((result)=>{
      //       console.log(res)
      //       res.status(200).json({msge:"sucessfully updated"})
      //       .catch((err)=>{
      //             console.log(err)
      //             res.status(500).json({msg:"err occurd"})
      //       })
      // })
})


app.post('/student',async(req,res)=>{
      // console.log(req.body.image);
      // console.log(req.body.name);
      // console.log(req.body.place);
      // console.log(req.body.phone);
      const nstudent = new Student({
            name:req.body.name,
            place:req.body.place,
            phoneNo:req.body.phoneNo
       })
     
     
     try{
         const postdata= await nstudent.save();
         res.status(200).json({result:postdata})
     }catch{
         res.status(500).json({msge:"problem while posting"})
     }
})

app.delete('/student/:id',async (req,res)=>{
      
      const id = req.params.id;
      
      try{
        const deletestudent=await Student.deleteOne({_id:id})
            res.status(200).json({result:deletestudent})
      }catch{
           res.status(500).json({msg:"error"})
      }
      
      
      
      
})
app.delete('/student',async (req,res)=>{
    
    try{
       const alldelete=await Student.deleteMany();
       res.status(200).json({result:alldelete})
    }catch{
        res.status(500).json({msg:"error while delteing"})
    }
    
    
     
})






app.listen(3003,()=>{
      console.log(`listneing on port no ${PORT}`)
})