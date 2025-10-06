import LoginForm from '@/components/login-form'
import SignInGithub from '@/components/sign-in-github'
import { auth } from '@/app/api/auth/auth'
import { redirect } from 'next/navigation'
import SignInGoogle from '@/components/sign-in-google'

const Login = async () => {
  const session = await auth()
  if (session) {
    redirect('/admin')
  }
  return (
    <div className='flex flex-col items-center justify-center gap-8 pt-4'>
      <div className='w-full  max-w-sm flex flex-col border-2 shadow-xl gap-4 p-4 rounded-xl'>
        <h1 className='text-2xl text-center font-bold'>Login</h1>
        <SignInGithub />
        <SignInGoogle />
        <p className='font-semibold'>Or use the form below:</p>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
