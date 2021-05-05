import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = ({setinput,addstudent,input}) => {
      const handelchange = (e) =>{
            setinput((olditems)=>{
            //      console.log(olditems);
                  return{...olditems,[e.target.name]:e.target.value}
                  
            })
      }
     const handelsubmit = (e) =>{
           e.preventDefault()
           addstudent();
           setinput({ 
           name:"",
           place:"",
           phoneNo:""})//after submit value will br blank
     }
      return (
            <div className="ml-5 container d-flex justify-content-center my-5 ">
                  <form onSubmit={handelsubmit} className="w-75 ml-5">
  <div className="form-group row ">
    <label  className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-10">
      <input type="text" value={input.name}  className="form-control" onChange={handelchange} name="name" placeholder="Enter your Name"/>
    </div>
  </div>
  <div className="form-group row">
    <label  className="col-sm-2 col-form-label">Place</label>
    <div className="col-sm-10">
      <input type="text" value={input.place} className="form-control" name="place" onChange={handelchange} placeholder="enter your location"/>
    </div>
  </div>
  <div className="form-group row">
    <label  className="col-sm-2 col-form-label">Phone No</label>
    <div className="col-sm-10">
      <input type="text" value={input.phoneNo} className="form-control" name="phoneNo" onChange={handelchange} placeholder="Enter your phone no"/>
    </div>
  </div>
    <div className="text-center my-3 "><button className="btn btn-primary  w-25"  >Submit</button></div> 
</form>
 
            </div>
      )
}

export default Form
