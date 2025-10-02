'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createUser({ email, username, password, img, isAdmin }: { email: string; username?: string; password: string; img?: string; isAdmin?: boolean }) {
  if (!email) {
    throw new Error('Email is required');
  }
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password,
        img,
        isAdmin: isAdmin || false,
      },
    });
    
    // Revalidate the home page to show the new user
    revalidatePath('/');
    
    return user;
  } catch (error: unknown) {
    // Handle duplicate email error
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: string }).code === 'P2002') {
      throw new Error('A user with this email already exists');
    }
    
    throw new Error('Failed to create user');
  }
}
