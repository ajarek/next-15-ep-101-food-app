import { signIn } from '@/app/api/auth/auth'
import { Button } from './ui/button'
import { Github } from 'lucide-react'

export default function SignInGithub() {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('github')
      }}
    >
      <Button
        type='submit'
        className='w-full cursor-pointer'
      >
        <Github />
        Signin with GitHub
      </Button>
    </form>
  )
}
