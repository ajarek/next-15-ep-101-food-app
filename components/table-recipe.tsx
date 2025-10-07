import {
  Table,
  TableBody,
  TableCaption,
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
      <TableCell className=""><Image src={recipe.image} alt={recipe.name} width={40} height={40} className='rounded-sm'/></TableCell>
      <TableCell className="">{recipe.name} </TableCell>
      <TableCell className="">{recipe.prepTimeMinutes}</TableCell>
      <TableCell className="">{recipe.ingredients.slice(0, 2)}...</TableCell>
      <TableCell className=""><Button variant={'secondary'}>Edit</Button></TableCell>
    </TableRow>
    )}
  </TableBody>
</Table>
  )
}

export default TableRecipe