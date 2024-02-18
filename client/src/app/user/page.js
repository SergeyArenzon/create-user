'use client'
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';

import { NEXT_PUBLIC_BACKEND_URL } from '@/app/config'


const BACKEND_URL = NEXT_PUBLIC_BACKEND_URL;


export default function page() {


    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async() => {
            const response = await fetch(`${BACKEND_URL}/users`);
            const users = await response.json()
            setUsers(users.users);
            setLoading(false)
        }
        getUsers()
    
    }, [])
 
    if(loading) return<CircularProgress />
  return (
    <div >
        {
            users.length > 0 ? <>
                {users.map(user => {
                    return <div className='shadow-md w-max p-5' key={user._id}>
                        <div className='flex'>
                            <h1 className='font-bold'>User name: </h1>
                            {user.username}
                        </div>
                        <div className='flex'>
                            <h1 className='font-bold'>Phone number: </h1>
                            {user.phone}
                        </div>
                    </div>
                })}
            </> :
            <h1 className='text-red-600 text-center'>No user found</h1>
        }
        
    </div>
  )
}
