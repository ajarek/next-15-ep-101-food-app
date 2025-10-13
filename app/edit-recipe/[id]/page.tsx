import RecipeUpdateForm from '@/components/recipe-update-form'
import { getRecipes } from '@/lib/actions'
import React from 'react'

const EditRecipe = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const recipes = await getRecipes()
  const recipe = recipes.find((recipe) => recipe.id === id)
  if (!recipe) {
    return <div>Recipe not found</div>
  }
  const initialData = {
    ...recipe,
    image: recipe.image === null ? undefined : recipe.image,
  }
  return (
    <div className=' flex flex-col items-center justify-center gap-8 pt-4'>
      <RecipeUpdateForm
        id={id}
        initialData={initialData}
      />
    </div>
  )
}

export default EditRecipe
