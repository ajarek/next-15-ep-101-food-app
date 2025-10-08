'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createUser } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Email must be valid.',
  }),
  username: z.string().optional(),
  password: z.string().min(1, 'Password is required'),
  img: z.string().optional(),
  isAdmin: z.boolean(),
})

type UserFormValues = z.infer<typeof formSchema>

const UserForm = () => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      img: '',
      isAdmin: false,
    },
  })

  const onSubmit: (values: UserFormValues) => Promise<void> = async (
    values
  ) => {
    await createUser(values)
    toast.success('User created successfully')
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full max-w-xl space-y-4 border-2 shadow-xl gap-4 p-4 rounded-xl'
      >
        <h1 className='text-2xl text-center font-bold'>Create Account</h1>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='ajarek@wp.pl'
                  {...field}
                />
              </FormControl>
              <FormDescription>Email must be valid.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Name</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Joe Doe'
                  {...field}
                />
              </FormControl>
              <FormDescription>User Name must be valid.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='img'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='https://example.com/image.jpg'
                  {...field}
                />
              </FormControl>
              <FormDescription>Image URL must be valid.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='********'
                  {...field}
                />
              </FormControl>
              <FormDescription>Password must correct.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='isAdmin'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  name='isAdmin'
                  type='hidden'
                  value={String(field.value)}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='w-full cursor-pointer'
        >
          Submit
        </Button>
      </form>
      <div className='flex items-center gap-4'>
        <p>Already have an account?</p>
        <Link
          href='/login'
          className='text-blue-500'
        >
          Login
        </Link>
      </div>
    </Form>
  )
}

export default UserForm
