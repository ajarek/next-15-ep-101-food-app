import { LoaderPinwheel } from 'lucide-react'

const Loading = () => {
  return (
    <div className='w-full min-h-screen  flex flex-col items-center justify-center '>
      <LoaderPinwheel
        className='animate-spin'
        size={64}
        aria-label='Loading...'
      />
    </div>
  )
}

export default Loading
