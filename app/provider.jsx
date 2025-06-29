"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabase';
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'

function Provider({ children }) {

  const {user} = useUser();
  const [userDetail, setUserDetail] = useState();

 useEffect(() => {
  // Only create user if user exists AND userDetail doesn't exist yet
  if (user && !userDetail) {
    CreateNewUser();
  }
}, [user, userDetail]); // Add userDetail as dependency

  const CreateNewUser = async() => {
    //If user already exists
    
    let { data: Users, error } = await supabase
    .from('Users')
    .select('*')
    .eq('email', user?.primaryEmailAddress.emailAddress);

    if(Users.length == 0){
      const { data, error } = await supabase
        .from('Users')
        .insert([
          { 
            name:user?.fullName,
            email:user?.primaryEmailAddress.emailAddress,

          },
        ])
        .select()
        setUserDetail(data[0]);
        return ;
    }
    setUserDetail(Users[0]);
  }

  return (
    <UserDetailContext.Provider value ={{ userDetail, setUserDetail}}>
      <div className='w-full'>{children}</div>
    </UserDetailContext.Provider>
  )
}

export default Provider