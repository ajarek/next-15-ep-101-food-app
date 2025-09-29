
export const apiRecipes = async () => {
  const url = `https://dummyjson.com/recipes`

  const responses = await fetch(url)
  const data = await responses.json()
  return data
}