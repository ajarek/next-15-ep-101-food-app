import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { Recipe } from '@/types/type-recipe'
import { Button } from "./ui/button"

const TableRecipe = ({recipes}:{recipes:Recipe[]}) => {
  return (
   <Table>
  
  <TableHeader>
    <TableRow>
      <TableHead className="">Image</TableHead>
      <TableHead className="">Name</TableHead>
      <TableHead className="">Price $</TableHead>
      <TableHead className="">Ingredients</TableHead>
      <TableHead className="">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {recipes.map(recipe=>
    <TableRow key={recipe.id}>
      <TableCell className="">{
        recipe.image ? (
          <Image src={recipe.image} alt={recipe.name} width={40} height={40} className='rounded-sm'/>
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-sm flex items-center justify-center text-xs text-gray-600">No image</div>
        )
      }</TableCell>
      <TableCell className="">{recipe.name} </TableCell>
      <TableCell className="">{recipe.price}</TableCell>
      <TableCell className="">{recipe.ingredients}</TableCell>
      <TableCell className=""><Button variant={'secondary'}>Edit</Button></TableCell>
    </TableRow>
    )}
  </TableBody>
</Table>
  )
}

export default TableRecipe