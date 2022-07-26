import React from 'react';
import './App.css';
import {useState,useEffect} from 'react'
import axios from 'axios';

function App() {
  const [state,setState]=useState([]);

  useEffect(()=>{
    axios.get('https://paulkv.pythonanywhere.com/api/read-data/').then((resp)=>{
      console.log(resp.data);
      setState(resp.data);
    }).catch((err)=>{
      console.log("error!!!");
    });
  });

  const handleClick=(obj)=>{
    
    console.log(obj.name)
    console.log(obj.status);
    let id=obj.id;
    let name=obj.name;
    let status=obj.status
    status=!status;
    console.log(status);
    

    axios.put(`https://paulkv.pythonanywhere.com/api/write-data/${id}/`,{
      'name':name,
      'status':status
    }).then((resp)=>{
      console.log(resp.data);
      axios.get('https://paulkv.pythonanywhere.com/api/read-data/').then((resp)=>{
        console.log(resp.data);
        setState(resp.data);
      }).catch((err)=>{
        console.log("error!!!");
      });
    }).catch((err)=>{
      console.log("error!!!");
    })
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header">My<span>IoT</span></div>
        <div className="inner-body">
          <div className="button-container">
            {state.map((obj,index)=>{
              return(
                  <button className="btn" onClick={()=>{handleClick(obj)}} style={obj.status?{backgroundColor:"#2A1E5C",color:"#F0EDEE"}:{backgroundColor:"#F0EDEE",color:"#2A1E5C"}} >{obj.name}</button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
