import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Form from './Form';
import Nanbar from "./Nanbar"
import Table from './Table'
import axios from 'axios'
import UpdateStudent from './UpdateStudent';

const Home = () => {
      const [input, setinput] = useState({
            name:"",
            place:"",
            phoneNo:""
      });

    const [table, settable] = useState([])
       
    const [updateinput, setupdateinput] = useState({
      name:"",
      place:"",
      phoneNo:""
});

  const [oldstudentdata, setoldstudentdata] = useState([])


      useEffect(() => {
        getstudent()
      }, [])
      
      const addstudent =()=>{
            if(input.name){
                  const adstudent ={
                        name:input.name,
                        place:input.place,
                        phoneNo:input.phoneNo
                  }
                  axios.post("/student",adstudent)
            }else{
                  alert('name is mandetory')
            }
            
       getstudent();
      }

      const getstudent =async()=>{
            const gstudent = await axios.get('/student')
            console.log(gstudent.data.result);
            settable(gstudent.data.result);
            
      }
       
      const removestudent = (data) =>{
              
            const id=data._id;
              console.log(data)
              axios.delete(`/student/${id}`) 
              console.log('remove student')
            getstudent();
      }

      const updatestudent = () =>{
        const id=oldstudentdata._id;
        console.log(id)
            const updatestudent={
                  name:updateinput.name,
                  place:updateinput.place,
                  phoneNo:updateinput.phoneNo
                   }
                   
             axios.put(`/student/${id}`,updatestudent) 
            console.log('remove student')
          getstudent();
      }
      const updateswitch=(data)=>{
            setoldstudentdata(data)
      }
      

      


      return (
           <Router>
                 
               <Nanbar/> 
              <Switch>
             <Route exact path='/'> <Form setinput={setinput} input={input} addstudent={addstudent}/> 
             <Table table={table} removestudent={removestudent}  updateswitch={updateswitch} />
             </Route>
            
              <Route exact path='/updatestudent'><UpdateStudent setupdateinput={setupdateinput} updatestudent={updatestudent} updateinput={updateinput}/></Route>
               
              </Switch>
               
             
           </Router>
           
      )
}

export default Home
