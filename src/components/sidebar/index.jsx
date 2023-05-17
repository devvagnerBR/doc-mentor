import React from 'react'
import { HouseLine,Backpack,AddressBook,ChalkboardSimple } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {


    const navItems = [
        { id: 1,icon: HouseLine,content: 'Início',path: '/dashboard' },
        { id: 2,icon: Backpack,content: 'Meus alunos',path: 'meus-alunos' },
        { id: 3,icon: AddressBook,content: 'Meus dados',path: 'minhas-escolas' },
        { id: 4,icon: ChalkboardSimple,content: 'Minhas escolas',path: 'meus-dados' },
    ]




    return (
        <div className='bg-neutral-800 w-60 h-full flex items-center flex-col justify-start  shrink-0'>

            <header className='h-20 w-full flex items-center justify-center shrink-0'>
                <h1
                    className='font-Alata text-gray-50 font-medium'>
                    <span
                        className='text-amber-400 text-[17px]'>
                        DOC{" "}
                    </span>
                    MENTOR</h1>
            </header>

            <nav className=' w-full h-full nav-active flex flex-col p-4 gap-2 '>
                {navItems.map( ( item ) => {

                    return (
                        <NavLink to={item.path} end={item.path === '/dashboard'} key={item.id} className='w-full nav-active h-6 flex items-center cursor-pointer justify-start gap-3'>
                            <item.icon size={22} className='text-neutral-700' />
                            <h1 className='text-neutral-700 font-light'>{item.content}</h1>
                        </NavLink>
                    )
                } )}
            </nav>
        </div>
    )
}

export default SideBar