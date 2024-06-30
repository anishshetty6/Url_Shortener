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
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { urlState } from '@/context'


const Login = () => {
  const [errors, setErrors] = React.useState([]);
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get('createNew')

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
  const {fetchUser}=urlState();

  useEffect(() => {
    if (error == null && data) {
      navigate(`/dash?${longLink ? `createNew=${longLink}` : ''}`);
      fetchUser();
    }
  }, [data, error])

  const handleLogin = async () => {
    setErrors([])
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });

      //api call
      await fnLogin()

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
          <CardTitle className="flex items-center justify-center ">Login</CardTitle>
          <CardDescription>to your account if you've signed up</CardDescription>
          {error && <Error message={error.message} />}
        </CardHeader>
        <CardContent className='space y-2'>
          <div className='space y-1'>
            <div className='mb-2'>
              <Input name='email' type='email' placeholder='Enter your email'
                onChange={handleInputChange} ></Input>
              {errors.email && <Error message={errors.email} />}
            </div>
            <Input name='password' type='password' placeholder='Enter your password'
              onChange={handleInputChange} ></Input>
            {errors.password && <Error message={errors.password} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button className='rounded-full ' onClick={handleLogin}>
            {loading ? <BeatLoader size={10} color='black' /> : 'Login'}
          </Button>
        </CardFooter>
      </Card>

    </div>
  )
}

export default Login