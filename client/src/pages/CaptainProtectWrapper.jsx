import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../Context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('captain-token')
    console.log("token is in protected captain ", token);

    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [ isLoading, setIsLoading ] = useState(true)


      async function fetchCaptainProfile() {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/captain/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("response is ", response);

          if (response.status === 200) {
            setCaptain(response.data.data.captain);
            setIsLoading(false)
          }
        } catch (error) {
          console.error("Error fetching captain profile:", error);
          localStorage.removeItem('captain-token')
          navigate('/captain-login')
        } finally {
          setIsLoading(false);
        }
      }


    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }
         fetchCaptainProfile();
        // axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/captain/profile`, {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // }).then(response => {
        //     if (response.status === 200) {
        //         setCaptain(response.data.data.captain)
        //         setIsLoading(false)
        //     }
        // })
        //     .catch(err => {

        //         localStorage.removeItem('token')
        //         navigate('/captain-login')
        //     })

       
    }, [ token ])

    

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper