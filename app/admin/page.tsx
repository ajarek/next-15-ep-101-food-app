import React from 'react'
import { getUsers } from '@/lib/actions'
import Image from 'next/image'

const Admin = async () => {
  const users = await getUsers()
  return (
    <div className=' flex flex-col items-center justify-center gap-8 '>
      <h1 className='text-2xl font-semibold'>Admin</h1>
       <h2 className='w-full text-xl text-left font-semibold'>Users:</h2>
      <div className='w-full max-w-7xl grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {users.map((user) => (
          <div
            key={user.id}
            className='border-2 p-[10px] shadow-md rounded-md flex flex-col gap-2'
            
          >
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Image:</strong>{' '}
              <Image
                src={user.img || ''}
                alt={user.username || ''}
                width={100}
                height={100}
                className='rounded-full'
              />
            </p>
            <p>
              <strong>Created At:</strong>{' '}
              {new Date(user.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin
