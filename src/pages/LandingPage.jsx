import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom'



const LandingPage = () => {
  const [longUrl, setLongUrl] = useState();
  const navigate=useNavigate();

  const handleShorten=(e)=>{
    e.preventDefault();
    if(longUrl) navigate(`/auth?createNew=${longUrl}`)
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>The only URL Shortener <br />that you'll ever need! 👇</h2>
      <form className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2'
      onSubmit={handleShorten}
      >
        <Input type='url' placeholder='Enter your long URL'
          value={longUrl}
          onChange={(e) => { setLongUrl(e.target.value) }}
          className=' flex-1 p-4'
        />
        <Button className='' type='submit' variant="destructive">Shorten</Button>
      </form>
      <img src="public\banner.jpeg" alt='banner' className='w-full my-10 md:px-11'></img>
      <Accordion type="multiple" collapsible className='w-full md:px-11'>
        <AccordionItem value="item-1">
          <AccordionTrigger>How does Trimrr URL work?</AccordionTrigger>
          <AccordionContent>
            When you enter a long URL, our system generates a shorter version of that URL. This shortened URL redirects to the original long URL when accessed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What other things can Trimrr do?</AccordionTrigger>
          <AccordionContent>
            Trimrr will generate a QR code for your link and provide statistics on it too!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What kind of stats?</AccordionTrigger>
          <AccordionContent>
            Stats regarding how many times the link was clicked, the location and the device of the user too!
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  )
}

export default LandingPage