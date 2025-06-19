import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs'
import { Clock, Link, Send } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function Header({ searchInputRecord }) {
  console.log(searchInputRecord);
  return (
    <div className='p-4 border-b flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <UserButton/>
        <div className='flex gap-1 items-center'>
          <Clock className='h-5 w-5 text-gray-500'/>
          <h2 className='text-sm text-gray-500'>
            {searchInputRecord?.created_at ? moment(searchInputRecord.created_at).fromNow() : 'Loading...'}
          </h2>
        </div>
      </div>

      <h2 className='line-clamp-1 max-w-md'>{searchInputRecord?.searchInput}</h2>

      <div className='flex gap-3'>
        <Button><Link/></Button>
        <Button><Send /> Share </Button>

      </div>
    </div>
  )
}

export default Header