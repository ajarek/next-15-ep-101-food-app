import { signIn } from '@/app/api/auth/auth'
import { Button } from './ui/button'
import Image from 'next/image'

export default function SignInGoogle() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('google')
      }}
    >
      <Button
        type='submit'
        className='w-full cursor-pointer'
      >
        <Image
          src='/google.png'
          alt='Google Logo'
          width={20}
          height={20}
        />{' '}
        Sign in with Google
      </Button>
    </form>
  )
}
