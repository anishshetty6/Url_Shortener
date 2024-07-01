import React, { useEffect } from 'react'
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
import Error from './Error'
import * as Yup from 'yup'
import useFetch from '@/hooks/useFetch'
import {  signup } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { urlState } from '@/context'


const Signup = () => {
  const [errors, setErrors] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew')

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
  const { fetchUser } = urlState();

  useEffect(() => {
    if (error == null && data) {
      navigate(`/dash?${longLink ? `createNew=${longLink}` : ''}`);
      fetchUser();
    }
  }, [data, error])

  const handleSignup = async () => {
    setErrors([])
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        profile_pic:Yup.mixed().required("Profile pic is required"),
      });

      await schema.validate(formData, { abortEarly: false });

      //api call
      await fnSignup()

    } catch (e) {
      const newErrors = {}
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  }

  return (
    <div>
      <Card className="flex flex-col items-center justify-center">
        <CardHeader>
          <CardTitle className="flex items-center justify-center ">Signup</CardTitle>
          <CardDescription>to create a new account </CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className='space y-2'>
          <div className='space y-1'>
            <div className='mb-2'>
              <Input name='name' type='text' placeholder='Enter your name'
                onChange={handleInputChange} ></Input>
              {errors.name && <Error message={errors.name} />}
            </div>
            <div className='mb-2'>
              <Input name='email' type='email' placeholder='Enter your email'
                onChange={handleInputChange} ></Input>
              {errors.email && <Error message={errors.email} />}
            </div>
            <div>
              <Input name='password' type='password' placeholder='Enter your password'
                onChange={handleInputChange} ></Input>
              {errors.password && <Error message={errors.password} />}
            </div>
            <div className='mt-2'>
              <Input name='profile_pic' type='file' accept='image/*'
                onChange={handleInputChange} ></Input>
              {errors.profile_pic && <Error message={errors.profile_pic} />}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className='rounded-full ' onClick={handleSignup}>
            {loading ? <BeatLoader size={10} color='black' /> : 'Create Account'}
          </Button>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Signup