/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password are required.')
          }
          const users = await prisma.user.findMany({
            where: { email: credentials.email },
            select: {
              id: true,
              username: true,
              password: true,
              email: true,
              img: true,
              isAdmin: true,
            },
          })
          const user = users[0] || null

          if (!user) {
            console.error(
              `Login attempt failed: User not found for email: ${credentials.email}`
            )
            throw new Error('Invalid credentials.')
          }

          // Ensure user has password and isAdmin properties
          if (!('password' in user)) {
            console.error(
              `Login attempt failed: User object missing password property for email: ${credentials.email}`
            )
            throw new Error('Invalid credentials.')
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            (user as any).password
          )
          if (!isPasswordCorrect) {
            console.error(
              `Login attempt failed: Invalid password for email: ${credentials.email}`
            )
            throw new Error('Invalid credentials')
          }

          return {
            id: user.id,
            name: user.username,
            email: user.email,
            img: user.img,
            isAdmin: user.isAdmin,
          }
        } catch (err: any) {
          console.error('Authentication error:', {
            message: err.message,
            email: credentials.email,
            timestamp: new Date().toISOString(),
          })

          if (
            err.message.includes('credentials') ||
            err.message.includes('attempts')
          ) {
            throw err
          }

          throw new Error('Authentication failed. Please try again.')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          admin: user.isAdmin,
          img: user.img,
        }
      }
      return token
    },

    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          img: token.img as string,
        },
      }
    },
  },
})
