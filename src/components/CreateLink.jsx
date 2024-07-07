import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { urlState } from '@/context'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Error from './Error'
import { Card } from './ui/card'


const CreateLink = () => {

    const { user } = urlState()
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get('createNew');

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <Button variant="destructive">Create New Link</Button>
                </DialogTrigger>
                <DialogContent classname='sm:max-w-md'>
                    <DialogHeader>
                        <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
                    </DialogHeader>

                    <Input id='title' placeholder='Short Link Title' />
                    <Error message={"error"}/>

                    <Input id='title' placeholder='Long URL' />
                    <Error message={"error"}/>
                    <div className='flex items-center gap-2'>
                    <Card className='p-2'>trimrr.in</Card> /
                    <Input id='title' placeholder='Custom Link (optional)' />
                    <Error message={"error"}/>
                    </div>

                <DialogFooter>
                    <Button variant='destructive'>Create</Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateLink