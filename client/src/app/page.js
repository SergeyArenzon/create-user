'use client'
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux'
import {setUser } from './feature/user/userSlice'
import { NEXT_PUBLIC_BACKEND_URL } from '@/app/config'


const BACKEND_URL = NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const { register,unregister, handleSubmit, formState: { errors },getValues, reset } = useForm();
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  console.log({user});

  const onSubmit = async(data) => {
    delete data.confirmPassword;
    const response = await fetch(`${BACKEND_URL}/users`,{
      method: "POST",    
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const user = await response.json()
    dispatch(setUser(user.user))
    reset()

  };



  return (
    <form className='flex flex-col gap-3 w-80' onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('username', { required: true })}
        id="username"
        label="User Name"
        variant="outlined"
        error={Boolean(errors.username)}
        helperText={errors.username ? 'Username is required' : ''}
      />
      <TextField
        {...register('phone', { required: true, pattern: /^\d+$/ })}
        id="phone"
        label="Phone Number"
        variant="outlined"
        type="tel"
        error={Boolean(errors.phone)}
        helperText={errors.phone ? 'Please enter a valid phone number' : ''}
      />
      <TextField
        {...register('password', { 
          required: true,
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[A-Za-z\d!@#$%^&*]{6,12}$/,
            message: 'Password must be 6-12 characters with at least one uppercase letter and one special character'
          } })}
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        error={Boolean(errors.password)}
        helperText={ errors.password?.message ? errors.password?.message :  errors.password ? "Password is required" : ""}
      />
      <TextField
        {...register('confirmPassword', {
          required: true,
          validate: (value) => value === getValues().password || "The passwords do not match"
        })}
        id="confirmPassword"
        label="Confirm Password"
        variant="outlined"
        type="password"
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword ? 'Passwords do not match' : ''}
      />
      <button className='bg-blue-700 text-white p-2 w-28'  type='submit'>SUBMIT</button>
    </form>
  );
}