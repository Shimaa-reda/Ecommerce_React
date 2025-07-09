import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function useFetchApi(endPoint) {
    let [data,setdata]=useState()
    const [loading, setLoading] = useState(true);

    
    useEffect(()=>{
        (async function (){
           let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`)
            setdata(data)
            setLoading(false)
        })()

       

    },[])
  return {data,loading}
}
