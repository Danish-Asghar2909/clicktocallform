import React, { Component, Fragment  } from 'react';
import Spinner from '../../components/Spinner';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { renderInput } from '../../helpers/inputs';
import { requestTokenAction, createSessionAction } from '../../actions/userActions';
import swal from 'sweetalert';

import './styles/login.scss';
import Axios from 'axios';
import SiteRoute from '../../SiteRoute';
import Home from '../Home';
import DemoHome from './DemoHome';
import typeax from './typeax';



export default function DemoLogin(props) {
    // let loggedIn = false;
    const [loggedIn, setLoggedIn]=useState(false)
    const [table, setTable]= useState([]);
    const [selectedUserName, setSelectedUserName]= useState('')
    const [selectedPassword, setSelectedPassword]= useState('')
    const [selectedAgentsId, setSelectedAgentsID]= useState('')
    const [selectedUserMobile, setSelectedUserMobile]= useState('')
    console.log("selected name", selectedUserName) 
    console.log("selected password", selectedPassword)
    console.log("selected agent id", selectedAgentsId)
    console.log("selected user mobile", selectedUserMobile)  
    const selectedData = {selectedUserName, selectedPassword, selectedUserMobile, selectedAgentsId}
    console.log("selected data is ", selectedData)
    
    console.log("table ", table)
    const tableData = async ()=>{
    
        let table = await Axios.get('https://clicktocallserver.herokuapp.com/agents/')
        let campaignName = table.data.map((item)=> item)
        // console.log("table in import ",table.data.map((item)=> item))
         return campaignName
  }

  useEffect(() => {
      tableData().then(result=> {setTable(result)})
     
  },[])

  const login = async () => {
		try {
		
			const { data } = await typeax.post('/login', { email_address: userName, password });

			if(!data.status){
				throw new Error(data.message)
			}

			console.log(data.data.token)

			// localStorage.setItem('auth_vibcrm', JSON.stringify(data.data));
			localStorage.removeItem('auth_vibcrm_token_dharm');
			localStorage.removeItem('auth_vibcrm_authId');
			localStorage.removeItem('auth_vibcrm_auth_secret');
			localStorage.setItem('auth_vibcrm_token_dharm', data.data.token);
			localStorage.setItem('authID', data.data.authId);
			localStorage.setItem('authSecretID', data.data.auth_secret);
      

			// localforage
			// localforage.setItem('auth_vibcrm_token_dharm', data.data.token)
	
      window.location.href = "/dialed";

		} catch (e) {
		
			console.log(e);

		}
	};



    const onSubmit = () => {
        table.map(item=> {
          console.log("items ",item)
          if (item.username == userName && item.password == password){
              console.log("match found")
              console.log(item.username)
              console.log(item.password)
              
              
              setLoggedIn(true)
             setSelectedUserName(item.username)
             setSelectedPassword(item.password)
             setSelectedAgentsID(item.agentID)
             setSelectedUserMobile(item.userMobile)
            //  localStorage.setItem("logistics-user-jwt", data.jwt);
            //  localStorage.setItem('user',data.user.Company_Name)
            
            localStorage.setItem('user',item.username)
            localStorage.setItem('password',item.password)
            localStorage.setItem('agentID',item.agentID)
            localStorage.setItem('userMobile',item.userMobile)
            localStorage.setItem('authID',item.authID)
            localStorage.setItem('authSecretID',item.authSecretID)
            localStorage.setItem('toNumber',item.toNumber)
            localStorage.setItem('id',item._id)
            localStorage.setItem('purchasedNumber', item.purchasedNumber)

            console.log("id", localStorage.getItem('id'))
            // localStorage.setItem('purchasedNumber',item.toNumber)
            

             window.location.href = "/dialed";


            //  console.log("selected name", selectedUserName) 
            //  console.log("selected password", selectedPassword)
            //  console.log("selected agent id", selectedAgentsId)
            //  console.log("selected user mobile", selectedUserMobile)           
          }
         
        })
      
      }


      const [userName, setUserName] = useState('')
      const [password, setPassword] = useState('')
    return (
        
        <div>
            <input type='text' value={userName} onChange={e=>setUserName(e.target.value)} placeholder="User"></input><br></br>
            <br></br><input type='password' value={password} onChange={e=> setPassword(e.target.value)} placeholder="Password"></input><br></br>
            <br></br><button onClick={login}>Submit</button>

            {/* the below line is for testing implement it when we have a redux setup */}
            {/* {
              // loggedIn ? <Home data = {selectedData}/>:<p>stay in logged in page</p>
              loggedIn ? <DemoHome props = {selectedData}/>:<p>stay in logged in page</p>
            } */}
        </div>
    )
}
