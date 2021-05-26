import Axios from 'axios';
import React, { useState } from 'react'


export default function DailedNumber() {
    let id = localStorage.getItem('id');
    let username = localStorage.getItem('user');
    let password = localStorage.getItem('password');
    let agentID = localStorage.getItem('agentID');
    let userMobile = localStorage.getItem('userMobile');
    let authId = localStorage.getItem('authID');
    let authSecretId = localStorage.getItem('authSecretID');
    // let dailedNumber = localStorage.getItem('dailedNumber');
    let purchasedNumber  = localStorage.getItem('purchasedNumber');

    const [dailedNumber, setdailedNumber] = useState('');
    const handleCall = () =>{

        Axios.post('https://ivrcall.herokuapp.com/final', {From: purchasedNumber ,authID: authId, authSecretID: authSecretId, To: userMobile , Method : "GET", Url :`https://ivrredirect.herokuapp.com/success/${dailedNumber}`})
        .then(response=> console.log(response))
        .catch(error=> console.log(error))


    }
    const handleSubmit =()=>{
        console.log("working", dailedNumber)
        console.log("id in dialed number ", id)
        localStorage.setItem('dailedNumber',dailedNumber) 
        Axios.patch(`https://clicktocallserver.herokuapp.com/agents/${id}`,{dailedNumber: dailedNumber})
        .then(response=> console.log(response))
        .catch(error=> console.log(error))


        Axios.post('https://ivrredirect.herokuapp.com/generate', {dailed: dailedNumber})
        .then(response=> console.log(response))
        .catch(error=> console.log(error))

        alert(`Cleck the Number which you want to dail and click CAll button to call ${dailedNumber}`)

        // Axios.post('https://ivrcall.herokuapp.com/final', {From: purchasedNumber ,authID: authId, authSecretID: authSecretId, To: userMobile , Method : "GET", Url :`https://ivrredirect.herokuapp.com/success/${dailedNumber}`})
        // .then(response=> console.log(response))
        // .catch(error=> console.log(error))


        //  window.location.href = "/";
    }
    return (
        
        <div>
            <h1>Please Enter Dailed Number</h1>
            <input type="text" value={dailedNumber} placeholder=" Dailed Number" onChange={e=> setdailedNumber(e.target.value)} ></input>
            <button onClick={handleSubmit} >Submit</button>
            {/* <form action="http://d204f282de87.ngrok.io/login" method="post">
                <p>Confirm Dailed Number </p>
                <p><input type='text' name="nm"></input></p>
                <p><input type="submit" value="submit"></input></p>
            </form> */}
            <button onClick={handleCall}>Call</button>
        </div>
    )
}
