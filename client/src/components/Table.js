import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Table = ({table,removestudent,updateswitch}) => {
      //console.log(table)
      const [search, setsearch] = useState("")
      
      return (
            <div className="container">
                 <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Place</th>
      <th scope="col">Phone No</th>
      <th scope="col"></th>
    </tr>
    <tr className="d-flex ">
      <input class="form-control mr-sm-2" type="search" onChange={(e)=>{setsearch(e.target.value)}} placeholder="Search by Name" aria-label="Search"/>
      
    </tr>
  </thead>

  <tbody>
    
     {table.filter((value)=>{
           if(search===""){
                 return value
           }else if(value.name.toLowerCase().includes(search.toLowerCase())){
                 return value
           }
     }).map((data,index)=>{
      return(
       <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</td> 
      <td>{data.place.toUpperCase()}</td>
      <td>{data.phoneNo}</td>
      <td><i  className="fa fa-times mx-3" onClick={()=>removestudent(data)}></i>
      <NavLink to='/updatestudent'><i  className="fa fa-pencil-alt pencil" onClick={()=>updateswitch(data)}></i></NavLink></td>
    </tr>)
     })}
   
  </tbody>
</table>


            </div>
      )
}

export default Table
