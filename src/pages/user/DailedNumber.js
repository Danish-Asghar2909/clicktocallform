import Axios from 'axios';
import React, { useState , useEffect , useRef} from 'react';
import { io } from "socket.io-client";


export default function DailedNumber() {
    let id = localStorage.getItem('id');
    let username = localStorage.getItem('user');
    let password = localStorage.getItem('password');
    let agentID = localStorage.getItem('agentID');
    let userMobile = localStorage.getItem('userMobile');
    let authId = localStorage.getItem('authID');
    let authSecretId = localStorage.getItem('authSecretID');
    let sid = localStorage.getItem('SID');
    let purchasedNumber  = localStorage.getItem('purchasedNumber');

    const [dailedNumber, setdailedNumber] = useState('');
    const [status , setStatus] = useState([])
    // console.log("status ", status.CallSid)
    

    const [callBack, setCallBack] = useState({})
    // console.log("callBack ", callBack.map((item)=> item.CallStatus))
    // console.log("call back ", callBack)


    const socketRef = useRef()
   
    // socketRef.current = io.connect("http://localhost:5000")

    const handleDisconnect = () =>{
        io.connect("http://localhost:5000").on('myCustomEvent', (name)=>{console.log("left working", name)})
    }

 
    // const handleDisconnect = () =>{
    //     io.connect("http://localhost:5000").on('left', (name)=>{console.log("left working", name)})
    // }
    // socket.on('myCustomEvent', (data) => {
    //     console.log(data)
    // })
    // const handleDisconnect = () =>{
    //     socketRef.current.on('left' , message=>{
    //         console.log("disconnectd server ", message)
    //     })
    // }
    
    const turnOnSocket = () =>{
       
            io.connect("https://vibtree.herokuapp.com").on('test', name=>{
                // console.log("test working",name)
                setCallBack(name)
            })
     
    }


      const handleTimer = ()=>{
          setTimeout(()=>{
            alert(" Either call failed or person is busy ")
            window.location.reload();
          }, 5000);
      }

      const handleCancel = ()=>{
        setTimeout(()=>{
          alert(" Call is Cancelled ")
          window.location.reload();
        }, 2000);
    }

  

    const refreshPage = ()=>{
        window.location.reload();
     }
   

 

    const getRealTimeData = async()=>{
        let data = await Axios.get('http://127.0.0.1:5000/display/1')
        .then(response=> console.log("response from real time data ", response))
        .catch(error=> console.log("error is ",error))

        return data
    }



    const handleCall = () =>{

        Axios.post('https://ivrcall.herokuapp.com/final', {From: purchasedNumber ,authID: authId, authSecretID: authSecretId, To: userMobile , Method : "GET", Url :`https://ivrredirect.herokuapp.com/success/91${dailedNumber}`})
        .then(response=> {
            localStorage.setItem('SID', response.data.sid)
            // console.log("handle call response ",response.data.sid)
    })
        .catch(error=> console.log(error))
        // console.log("call done ", dailedNumber);
        turnOnSocket();
     
    }
    const handleSubmit =()=>{
        // console.log("working", dailedNumber)
        // console.log("id in dialed number ", id)
        localStorage.setItem('dailedNumber',dailedNumber) 
        Axios.patch(`https://clicktocallserver.herokuapp.com/agents/${id}`,{dailedNumber: dailedNumber})
        .then(response=> console.log(response.status))
        .catch(error=> console.log(error))


        Axios.post('https://ivrredirect.herokuapp.com/generate', {dailed: dailedNumber})
        // .then(response=> console.log("response of generate",response.status))
        .then(response=> {if(response.status == 200){
            // console.log("status code is 200 ")
            handleCall();
        }})
        .catch(error=> console.log(error))

        // alert(`Cleck the Number which you want to dail ${dailedNumber}`)


        const getDailXml = async() =>{
            let XML = await Axios.get(`https://ivrredirect.herokuapp.com/success/${dailedNumber}`)
            return XML
        }

        // console.log("XML is ", getDailXml())

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
            {/* <button onClick={handleCall}>Call</button> */}
            {callBack.CallSid !=null ? <p>Not Null</p> : <p>Null Right now</p>}
            {callBack.CallStatus == "completed" ? <p>Completed{callBack.Timestamp}</p>: null}
            {callBack.CallStatus == "initiated" ? <p>initiated in {callBack.Timestamp}</p>:null}
            {callBack.CallStatus == "answered" ? <p>answered in {callBack.Timestamp}</p>:null}
            {callBack.CallStatus == "ringing" ? <p>ringing in {callBack.Timestamp}</p>:null}
            {callBack.CallStatus == "in-progress" ? <p>in-progress in {callBack.Timestamp}</p>:null }
            {callBack.CallStatus == "busy" ?  handleTimer() :null }
            {callBack.CallStatus == "failed" ?  handleTimer() :null }
            {callBack.CallStatus == "canceled" ?  handleCancel() :null }

            {/* whenever we found the dailedNumber which we send from frontend
            and the To number from websocket equals it refresh the page */}
            
            {callBack.To == "91"+dailedNumber && callBack.CallStatus == "completed" ? refreshPage() : null}
   
        </div>
    )
}
