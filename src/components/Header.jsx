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
import { LinkIcon, LogOut } from 'lucide-react'
import { urlState } from '@/context'
import useFetch from '@/hooks/useFetch'
import { logout } from '@/db/apiAuth'
import { BarLoader } from 'react-spinners'

const Header = () => {

    const navigate = useNavigate()

    const { user, fetchUser } = urlState()

    const { loading, fn: fnLogout } = useFetch(logout);

    return (
        <>
        <nav className='flex justify-between items-center p-4 z-10'>
            <Link to='/'>
                <img src='/logo.png' className='h-16' alt='logo' />
            </Link>
            <div>
                {!user ?
                    <Button onClick={() => navigate('/auth')} >Login</Button>
                    : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
                                <Avatar>
                                    <AvatarImage src={user?.user_metadata?.profile_pic} alt="dp" />
                                    <AvatarFallback>AS</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger >
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link to={'/dash'} className='flex'>
                                    <LinkIcon className='mr-2 h-4 w-4' />
                                    <span> My Links</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className='text-red-400'
                                onClick={() => {
                                    fnLogout().then(() => {
                                        navigate('/auth')
                                    })
                                }}>
                                    <LogOut className='mr-2 h-4 w-4' />
                                    <span >Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
            </div>
        </nav>
            {loading && <BarLoader className='mb-4' width={"100%"} color='red'/>}
        </>
    )
}

export default Header