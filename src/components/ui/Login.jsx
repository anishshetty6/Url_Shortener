import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BeatLoader } from 'react-spinners'
import Error from '../Error'


const Login = () => {
  const [formData,setFormData]=React.useState({
    email:'',
    password:''
  });

  const handleInputChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prevState)=>({
      ...prevState,
      [name]:value,
    }));
  };

  return (
    <div>
      <Card className="flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center ">Login</CardTitle>
          <CardDescription>to your account if you've signed up</CardDescription>
          <Error message='some error occured' />
        </CardHeader>
        <CardContent className='space y-2'>
          <div className='space y-1'>
            <div className='mb-2'>
              <Input name='email' type='email' placeholder='Enter your email' />
              <Error message='Email is required' />
            </div>
            <Input name='password' type='password' placeholder='Enter your password' />
            <Error message='Password is required' />
          </div>
        </CardContent>
        <CardFooter>
          <Button className='rounded-full'>
            {true ? <BeatLoader size={10} color='black' /> : 'Login'}
          </Button>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Login