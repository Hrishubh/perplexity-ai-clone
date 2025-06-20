"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header';
import { supabase } from '@/services/supabase';
import DisplayResult from './_components/DisplayResult';

function SearchQueryResult() {
  const {libId} = useParams();
  const[searchInputRecord, setSearchInputRecord] = useState();

  useEffect(()=>{
    GetSearchQueryRecord();
  },[]);

  const GetSearchQueryRecord = async ()=>{
    let { data: Library, error } = await supabase
    .from('Library')
    .select('*, Chats(*)')
    .eq('libId', libId);

    console.log("Fetched Library Data with chat data and everything. This is also the searchInputRecord:");
    console.log(Library[0]);
    await setSearchInputRecord(Library[0]);
  }

  return (
    <div>
      <Header searchInputRecord={searchInputRecord}/>
      <div className='px-10 md:px-20 lg:px-36 xl:px-56 mt-20'>
        <DisplayResult searchInputRecord={searchInputRecord}/>
      </div>
    </div>
  )
}

export default SearchQueryResult