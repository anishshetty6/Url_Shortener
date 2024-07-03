import React from 'react'
import { BarLoader } from 'react-spinners'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'


const Dashboard = () => {
  return (
    <div className='flex flex-col gap-8'>
      {true && <BarLoader width={"100%"} color="#36d7b7" />}
      <div className='grid grid-cols-2 gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>Links Created</CardTitle>
        </CardHeader>
        <CardContent>
          <p>0</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <p>0</p>
        </CardContent>
      </Card>
      </div>
      <div className='flex justify-between'>
        <h1 className='text-4xl font-extrabold'>
          My Links
        </h1>
        <Button>Create Link</Button>
      </div>

    </div>
  )
}

export default Dashboard