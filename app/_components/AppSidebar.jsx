"use client"
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { ArrowUpRight, Compass, GalleryHorizontalEnd, LogIn, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SignUpButton, UserButton, useUser } from '@clerk/nextjs'

const MenuOptions=[
  {
    title:'Home',
    icon:Search,
    path: '/'
  },
  {
    title:'Discover',
    icon:Compass,
    path: '/discover'
  },
  {
    title:'Library',
    icon:GalleryHorizontalEnd,
    path: '/library'
  },
  {
    title:'Sign In',
    icon:LogIn,
    path: '/sign-in'
  }
]

function AppSidebar() {
  const path=usePathname();
  const { user } = useUser();

  return (
     <Sidebar>
      <SidebarHeader className='bg-accent flex items-center py-5'>
        <Image src={"/logo.png"} alt="logo" width={200} height={150} />
      </SidebarHeader>
      <SidebarContent className='bg-accent'>
        <SidebarGroup>
        <SidebarContent>
          <SidebarMenu>
            {MenuOptions
            .filter(menu => !(user && menu.title === 'Sign In'))
            .map((menu, index) => {
              const isActive = menu.path === '/' ? path === '/' : path.startsWith(menu.path) && menu.path !== '/';
              return (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild
                    className={`p-5 py-6 hover:bg-transparent hover:font-bold 
                    ${isActive ? 'font-bold' : ''}`}>
                    <a href={menu.path} className=''>
                      <menu.icon className='h-8 w-8'/>
                      <span className='text-lg'>{menu.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
          {!user? 
          <SignUpButton>
            <Button className='rounded-full mx-4 mt-4'>Sign Up</Button>
          </SignUpButton>:
          <SignUpButton>
            <Button className='rounded-full mx-4 mt-4'>Log Out</Button>
          </SignUpButton>}
        </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='bg-accent'>
        <div className='p-3 flex flex-col'>
          <h2 className='text-gray-500'>Try Now</h2>
          <p className='text-gray-400'>Upgrade for Image upload, smarter AI & more Copilot</p>
          <Button variant={'secondary'} className='text-gray-500 mb-3 w-full text-md'> <ArrowUpRight/>Learn More</Button>
          <UserButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar