import React, { useEffect, useState } from 'react'
import Axios from 'axios'

export default function ShowCallBack() {


    const [statusCallBack, setstatusCallBack] = useState({})

    const getDailXml = async() =>
             {
             let XML = await Axios.get(`https://ivrstatuscallback.herokuapp.com/display`)
             return XML
             }

    useEffect(() => {
        const timer = setInterval(() => {
          console.log('This will run after 1 second!')
          getDailXml().then(result=> {setstatusCallBack(result)})
        }, 2000);
        return () => clearTimeout(timer);
      }, []);

      console.log("call back status from Show Call Back component", statusCallBack)
    return (
        <div>
            <h1>Call Back is working</h1>
        </div>
    )
}
