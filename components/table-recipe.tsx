import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { Recipe } from '@/types/type-recipe'
import { Button } from './ui/button'
import ButtonDeleteRecipe from './buton-delete-recipe'
import Link from 'next/link'
import { SquarePen } from 'lucide-react'

const TableRecipe = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='max-sm:hidden'>Image</TableHead>
          <TableHead className=''>Name</TableHead>
          <TableHead className=''>Price $</TableHead>
          <TableHead className='max-sm:hidden'>Ingredients</TableHead>
          <TableHead className=''>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recipes.map((recipe) => (
          <TableRow key={recipe.id}>
            <TableCell className='max-sm:hidden'>
              {recipe.image ? (
                <Image
                  src={recipe.image}
                  alt={recipe.name}
                  width={40}
                  height={40}
                  className='rounded-sm'
                />
              ) : (
                <div className='w-10 h-10 bg-gray-200 rounded-sm flex items-center justify-center text-xs text-gray-600'>
                  No image
                </div>
              )}
            </TableCell>
            <TableCell className=''>{recipe.name} </TableCell>
            <TableCell className=''>{recipe.price}</TableCell>
            <TableCell className='max-sm:hidden'>
              {recipe.ingredients.slice(0, 30)}...
            </TableCell>
            <TableCell className='flex items-center gap-2'>
              <Button
                asChild
                variant={'secondary'}
                size='icon'
              >
                <Link href={`/edit-recipe/${recipe.id}`}>
                  <SquarePen />
                </Link>
              </Button>
              <ButtonDeleteRecipe id={recipe.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableRecipe
