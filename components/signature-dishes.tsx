import React from 'react'
import * as motion from 'motion/react-client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import Image from 'next/image'
import ButtonAddCart from './button-add-cart'
import { getRecipes } from '@/lib/actions'

const SignatureDishes = async () => {
  const  recipes  = await getRecipes() 
  return (
    <div className='w-full flex flex-col items-center justify-center gap-4  '>
      <h1 className='text-2xl font-semibold'>Our Signature Dishes</h1>
      <p>A selection of our most popular dishes loved by our customers</p>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ scale: 1 }}
        whileInView={{ opacity: 1 }}
        layout
        transition={{ duration: 0.5 }}
        className='w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4  '
      >
        {recipes.slice(0, 3).map((recipe) => (
          <Card
            key={recipe.id}
            className=''
          >
            <CardHeader>
              <div className='relative w-full h-72 rounded-md overflow-hidden'>
                <Image
                  src={recipe.image||''}
                  alt='image'
                  fill
                   sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className='object-cover'
                  priority
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle>{recipe.name}</CardTitle>
              <CardDescription>
                {recipe.ingredients}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <div className='w-full flex items-center justify-between'>
                <p className='text-xl font-semibold'>
                  $ {recipe.price}
                </p>
                <ButtonAddCart
                  id={+recipe.id}
                  name={recipe.name}
                  image={recipe.image||''}
                  ingredients={recipe.ingredients}
                  price={recipe.price}
                  quantity={1}
                />
              </div>
            </CardFooter>
          </Card>
        ))}
      </motion.div>
    </div>
  )
}

export default SignatureDishes
