import Axios from 'axios';
import React, { useState , useEffect , useRef} from 'react';
import { io } from "socket.io-client";
import typeax from './typeax';


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
    // console.log("dialed ", dailedNumber)
    const [status , setStatus] = useState([])
    // console.log("status ", status.CallSid)

    React.useEffect( ()=>{
		typeax.get('/getAuth')
	   .then(response=>{
		 console.log("response Auth Credential", response.data.data);
		 // localStorage.setItem('authID',response.data.data.authID)
		 // console.log("auth id in make service ", response.data.data.auth_id);
		
		 localStorage.setItem('authID',response.data.data.auth_id)
		 localStorage.setItem('username',response.data.data.username)
         localStorage.setItem('userMobile',response.data.data.phone) 
	   })
	   .catch(err=>{
		 console.log("error ", err)
	   })
	 },[])

    const authID = localStorage.getItem('authID');
    const authSecretID = localStorage.getItem('authSecretID');
    const phone = localStorage.getItem('userMobile');

    const [callBack, setCallBack] = useState([])
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
    
let call_sid = localStorage.getItem('sid')

let call_id ;
let x;
const records = async(a=call_id , b=dailedNumber)=>{
    console.log("call sid in records function ", a);
    alert(0)
    const toSave = {
      dialedNo: b,
      sid: a,
      username: "ishani@vibtree.com",
      notes: "call from ishani",
      tags: "interested",
      cloudNumber: "913368110803",
      }
      await typeax.post('/ide/save', toSave).then(resp => resp.data).then(data => console.log(data)).catch(err => console.log(err))
  };
    const turnOnSocket = async () =>{
       
            io.connect("https://vibtree2.herokuapp.com").on('test', name=>{
                // console.log(name)
                if(name.CallStatus === 'completed'){
                    call_id = name.CallSid
                    records(name.CallSid)
                }
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

        Axios.post('https://ivrcall.herokuapp.com/final', {From: "913368110803" ,authID: authID, authSecretID: authSecretID, To: phone , Method : "GET", Url :`https://ivrredirect.herokuapp.com/success/${dailedNumber}`})
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
            {/* {callBack.CallSid !=null ? <p>Not Null</p> : <p>Null Right now</p>}
            {callBack.CallStatus == "completed" ? <p>Completed{callBack.Timestamp}</p>: null}
            {callBack.CallStatus == "initiated" ? <p>initiated in {callBack.Timestamp}</p>:null}
            {callBack.CallStatus == "answered" ? <p>answered in {callBack.Timestamp}</p>:null}
            {callBack.CallStatus == "ringing" ? <p>ringing in {callBack.Timestamp}</p>:null}
            {callBack.CallStatus == "in-progress" ? <p>in-progress in {callBack.Timestamp}</p>:null }
            {callBack.CallStatus == "busy" ?  handleTimer() :null }
            {callBack.CallStatus == "failed" ?  handleTimer() :null }
            {callBack.CallStatus == "canceled" ?  handleCancel() :null } */}

            {/* whenever we found the dailedNumber which we send from frontend
            and the To number from websocket equals it refresh the page */}
            {/* {callBack.To == dailedNumber && callBack.CallStatus == "completed" ? records() : null} */}
   
        </div>
    )
}
