'use client'
import React from 'react'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import type { Recipe } from '@/types/type-recipe'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'

const ButtonAddCart = ({
  id,
  name,
  image,
  ingredients,
  prepTimeMinutes,
  quantity
  
}: Recipe) => {
  const router = useRouter()
  const { addItemToCart, items } = useCartStore()
  return (
    <Button
      onClick={() => {
        if (items.some((i) => i.id === id)) {
          toast('This item is already in your cart')
          router.push('/menu')
          return
        }
        addItemToCart({
          id,
          name,
          image,
          ingredients: [ingredients[0], ingredients[1], ingredients[2]],
          prepTimeMinutes,
          quantity,
        })
        toast.success('Product added to cart')
        router.push('/menu')
      }}
      aria-label='Add to cart'
      className='flex items-center gap-2 cursor-pointer '
      
    > <Plus/>
      Add  cart
    </Button>
  )
}

export default ButtonAddCart