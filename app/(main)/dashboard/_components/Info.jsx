'use client'
import React, { useContext } from 'react'
import { UserDetailContext } from './../../_context/UserDetailContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Info() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext)
  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='font-bold text-3xl text-primary'>Hello, {userDetail?.name}</h2>
        <div className='flex items-center gap-2'>
           <Image src={"/coin.png"} alt='coin' width={40} height={40} />
           <h2 className='font-bold text-3xl'>{userDetail?.credits} Credit Left</h2>
        </div>
      </div>

      <div className='flex justify-between items-center mt-6'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <Link href='create'><Button> + Create New Logo</Button></Link>
      </div>

    </div>
  )
}

export default Info