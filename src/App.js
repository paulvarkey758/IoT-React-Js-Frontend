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
  },[]);

  const handleClick=(obj,e)=>{
    console.log(e.target);
    
    console.log(obj.name)
    console.log(obj.status);
    let id=obj.id;
    let name=obj.name;
    let status=obj.status
    status=!status;
    console.log(status);
    //to change the selected button color
    if(status===true){
      e.target.style.backgroundColor="red";
      e.target.style.color="white";
    }
    else{
      e.target.style.backgroundColor="white";
      e.target.style.color="black";
    }

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
        {state.map((obj,index)=>{
          return(
              <button className="btn" onClick={(e)=>{handleClick(obj,e)}} style={obj.status?{backgroundColor:"red"}:{backgroundColor:"white"}} >{obj.name}</button>
          )
        })}
      </div>
    </div>
  );
}

export default App;
