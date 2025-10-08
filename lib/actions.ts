'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'

export async function createUser({
  email,
  username,
  password,
  img,
  isAdmin,
}: {
  email: string
  username?: string
  password: string
  img?: string
  isAdmin?: boolean
}) {
  if (!email) {
    throw new Error('Email is required')
  }
const hashedPassword = await bcrypt.hash(password, 5)
  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        img,
        isAdmin: isAdmin || false,
      },
    })

    // Revalidate the home page to show the new user
    revalidatePath('/')

    return user
  } catch (error: unknown) {
    // Handle duplicate email error
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'P2002'
    ) {
      throw new Error('A user with this email already exists')
    }

    throw new Error('Failed to create user')
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        img: true,
        isAdmin: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

export async function deleteUser(id:string) {
  try {
    await prisma.user.delete({
      where: { id },
    })
    revalidatePath('/admin')
  } catch (error) {
    console.error('Error deleting user:', error)
    throw new Error('Failed to delete user')
  }
}

export async function createRecipe({
  name,
  image,
  price,
  ingredients,
}: {
  name: string
  image?: string
  price: number
  ingredients: string
}) {
  if (!name) {
    throw new Error('Name is required')
  }

  try {
    const recipe = await prisma.recipe.create({
      data: {
        name,
        image,
        price: Number(price),
        ingredients,
      },
    })

    // Revalidate the menu page so new recipe appears
    revalidatePath('/menu')

    return recipe
  } catch (error) {
    console.error('Error creating recipe:', error)
    throw new Error('Failed to create recipe')
  }
}

export async function  getRecipes() {
  try{
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return recipes
  }
  catch (error) {
    console.error('Error fetching recipes:', error)
    throw new Error('Failed to fetch recipes')
  }
}

