'use client'
import React from 'react'
import { Button } from './ui/button'
import { deleteRecipe } from '@/lib/actions'
import { Trash2 } from 'lucide-react'

const ButtonDeleteRecipe = ({ id }: { id: string }) => {
  return (
    <form action={async () => await deleteRecipe(id)}>
      <input
        type='hidden'
        name='id'
        value={id}
      />
      <Button
        type='submit'
        variant='destructive'
        size='icon'
      >
        <Trash2 />
      </Button>
    </form>
  )
}

export default ButtonDeleteRecipe
