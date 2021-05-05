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
     // _id:mongoose.Schema.Types.ObjectId,
      // image : {
      //       type:String,
      //       require:true},
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
     let {name}=req.query
     
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
      // const id = req.params.id;
      // Student.find({_id:id},(err,result)=>{
      //       if(err){
      //             console.log(err)
      //             res.status(500).json('err')
      //       }else{
      //             res.status(200).json(result)
         //   }
     // })
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
app.put('/student/:id',(req,res)=>{
     
      //const {id,image,name,place,phone} = req.body;
       const id =req.params.id;
      const name=req.body.name;
       const place=req.body.place;
      const phoneNo=req.body.phoneNo;
      Student.update({_id:id},{$set:{name:name,place:place,phoneNo:phoneNo}})
      .then((result)=>{
            console.log(res)
            res.status(200).json({msge:"sucessfully updated"})
            .catch((err)=>{
                  console.log(err)
                  res.status(500).json({msg:"err occurd"})
            })
      })
})


app.post('/student',(req,res)=>{
      // console.log(req.body.image);
      // console.log(req.body.name);
      // console.log(req.body.place);
      // console.log(req.body.phone);
      const nstudent = new Student({
            _id : new mongoose.Types.ObjectId,
            // image:req.body.image,
            name:req.body.name,
            place:req.body.place,
            phoneNo:req.body.phoneNo
       })
       nstudent.save()
       .then((result)=>{
             console.log('data save suscessfull');
             res.status(200).json({msge:"data save sucessfully"})
       }).catch((err)=>{
             console.log('err');
             res.status(500).json({msge:"dont worry do it again"})
       })
      
})

app.delete('/student/:id',(req,res)=>{
      
      const id = req.params.id;
      Student.deleteOne({_id:id},(err,result)=>{
            if(err)
            {
                  console.log(err);
                  res.status(500).send('error')
            }else{
                  res.status(200).json({msge:"record successfully deleted"})
            }
      })
})
app.delete('/student',(req,res)=>{
      Student.deleteMany().then((result)=>{
         console.log("all items delted")
         res.status(200).json({masge:"all data delted"})
      }).catch((err)=>{
            console.log("error whild delte all data")
            res.status(500).json({msg:"problem occuring"})
      })
})






app.listen(3003,()=>{
      console.log(`listneing on port no ${PORT}`)
})