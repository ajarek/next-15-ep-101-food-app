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
