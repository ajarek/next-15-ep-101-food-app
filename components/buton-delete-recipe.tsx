'use client'
import React from 'react'
import { Button } from './ui/button'
import { deleteRecipe } from '@/lib/actions'
  
const ButtonDeleteRecipe = ({ id }: { id: string }) => {

  
  return (
    <form action={async()=>await deleteRecipe(id)} >
       <input type="hidden" name="id" value={id} />
      <Button type='submit' variant="destructive">Delete</Button>
    </form>
  )
}

export default ButtonDeleteRecipe