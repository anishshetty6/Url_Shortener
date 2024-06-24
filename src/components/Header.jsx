import React from 'react'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




const Header = () => {

    const navigate = useNavigate()
    const user = true;
    return (
        <nav className='flex justify-between items-center p-4'>
            <Link to='/'>
                <img src='/logo.png' className='h-16' alt='logo' />
            </Link>
            <div>
                {!user ?
                    <Button onClick={() => navigate('/auth')} >Login</Button>
                    : (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="/scott.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    )
                }
            </div>
        </nav>
    )
}

export default Header