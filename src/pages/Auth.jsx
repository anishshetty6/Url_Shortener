import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Auth = () => {

  const [searchParams] = useSearchParams();

  return (
    <div className=' mt-24 flex flex-col items-center gap-10'>
      <h1 className='text-4xl font-extrabold'>
        {searchParams.get('createNew')
          ? "Wait!Let's get you logged in first 😊"
          :
          <Tabs defaultValue="Login" className="w-[400px]">
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value="Login">Login</TabsTrigger>
              <TabsTrigger value="Signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="Login">Login Component</TabsContent>
            <TabsContent value="Signup">Signup component</TabsContent>
          </Tabs>

        }
      </h1>

    </div>
  )
}

export default Auth