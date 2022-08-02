import { Component } from "react";
import React from "react";
import axios from "axios";

class Sensors extends Component{
    constructor(props){
        super(props);
        this.state={'sensorReadings':[]};
    }

    componentDidMount(){
        this.sensData=setInterval(
            ()=>{
                axios.get('https://paulkvarkey.pythonanywhere.com/api/sensor-read/').then((resp)=>{
                    this.setState({'sensorReadings':resp.data});
                    console.log(this.state);
                }).catch((err)=>{
                    console.log("error occured while fetching sensor data");
                })
            },1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.sensData);
    }
    render(){
        return(
            <div className="sen-container">
                {
                    this.state.sensorReadings.map((obj,index)=>{
                        return(
                            <div className="sen-card">
                                <div className="sen-data">
                                    <div className="val">{obj.value}</div>
                                    <div className="unit">{obj.unit}</div>
                                </div>
                                <div className="sen-title">{obj.name}</div>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }
}

export default Sensors