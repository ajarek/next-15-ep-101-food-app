'use client'
import React from 'react'
import { Button } from './ui/button'
import { deleteUser } from '@/lib/actions'
  
const ButtonDeleteUser = ({ id }: { id: string }) => {

  
  return (
    <form action={async()=>await deleteUser(id)} >
       <input type="hidden" name="id" value={id} />
      <Button type='submit' variant="destructive">Delete User</Button>
    </form>
  )
}

export default ButtonDeleteUser