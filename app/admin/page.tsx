import React from 'react'
import { getUsers } from '@/lib/actions'
import Image from 'next/image'
import {auth} from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import ButtonDeleteUser from '@/components/button-delete-user'
import { getRecipes } from '@/lib/actions'
import TableRecipe from '@/components/table-recipe'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'


const Admin = async () => {
  const session = await auth()
  if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect('/')}
  const users = await getUsers()
 const  recipes  = await getRecipes()
  return (
    <div className=' flex flex-col items-center justify-center gap-8 '>
      <h1 className='text-2xl font-semibold'>Admin</h1>
      <div className='w-full flex items-center justify-between'>
      <h2 className='w-full text-xl text-left font-semibold'>Users:</h2>
      
       <Button asChild>
      <Link  href='/signup' className='flex items-center gap-2'>
        <Plus />Add User
      </Link>
        </Button>  
      </div>
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
            <p>{user.isAdmin?'role: Admin':'role: User'}</p>
            <p>
              <strong>Created At:</strong>{' '}
              {new Date(user.createdAt).toLocaleString()}
            </p>
            <ButtonDeleteUser id={user.id} />
          </div>
        ))}
      </div>
      <div className='w-full flex items-center justify-between'>
      <h2 className='w-full text-xl text-left font-semibold'>All Recipes:</h2>
      
       <Button asChild>
      <Link  href='/add-recipe' className='flex items-center gap-2'>
        <Plus />Add Recipe
      </Link>
        </Button>  
      </div>
      <div className='w-full flex flex-col gap-4 '>
        
          <TableRecipe  recipes={recipes} />
        
      </div>
    </div>
  )
}

export default Admin
