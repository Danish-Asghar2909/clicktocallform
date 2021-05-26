import React from 'react'

const DemoHome=(props)=> {
    let uid = localStorage.getItem('user');
    console.log("uid", uid)
    
    console.log("demo home props ",props.props)
    return (
        <div>
            <p>Selected Data</p>
            <ul>
                <li>{props.props.selectedUserName}</li>
                <li>{props.props.selectedPassword}</li>
                <li>{props.props.selectedUserMobile}</li>
                <li>{props.props.selectedAgentsId}</li>
            </ul>
        </div>
    )
}

export default DemoHome;
