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
import { apiRecipes } from '@/lib/api-recipes'
import Image from 'next/image'
import { Recipe } from '@/types/type-recipe'
import FormSearchDist from '@/components/search-dist'
import ButtonAddCart from '@/components/button-add-cart'

const Menu = async({ searchParams,}: {  searchParams: Promise<{ name: string }>}) => {

 const { name } = (await searchParams) as { name: string }

   const { recipes } = await apiRecipes() as { recipes: Recipe[] }

  return (
    <div className=' flex flex-col items-center justify-center gap-8 pt-4'>

      <div className="text-center">
                    <h2 className="text-balance text-xl font-semibold lg:text-2xl">Our Menu</h2>
                      <p>Choose a dish created especially for you</p>
                </div>
      
      <div className="w-full max-w-md mx-auto">
       <FormSearchDist query='name'/>
      </div>
                <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ scale: 1 }}
        whileInView={{ opacity: 1 }}
        layout
        transition={{ duration: 0.5 }}
        className='w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4  '
      >
        {recipes
        .filter((item) =>
            name
              ? item.name.toLowerCase().includes(name.toLowerCase())
              : true
          )
        .map((recipe) => (
          <Card
            key={recipe.id}
            className=''
          >
            <CardHeader>
              <div className='relative w-full h-72 rounded-md overflow-hidden'>
                <Image
                  src={recipe.image}
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
                {recipe.ingredients
                  .slice(0, 5)
                .map((ing: string) => (
                  <div key={ing}>{ing}</div>
                ))}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <div className='w-full flex items-center justify-between'>
                <p className='text-xl font-semibold'>
                  $ {recipe.prepTimeMinutes}
                </p>
                 <ButtonAddCart
                                  id={recipe.id}
                                  name={recipe.name}
                                  image={recipe.image}
                                  ingredients={recipe.ingredients}
                                  prepTimeMinutes={recipe.prepTimeMinutes}
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

export default Menu