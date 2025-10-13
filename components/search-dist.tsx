'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
interface SearchProps {
  query: string
}

const FormSearchDist = ({ query }: SearchProps) => {
  const [value, setValue] = React.useState('')
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set(`${query}`, term)
    } else {
      params.delete(`${query}`)
    }
    try {
      replace(`/menu?${params.toString()}`)
      setValue('')
    } catch (error) {
      console.error('Failed to replace URL parameters:', error)
    }
  }

  return (
    <div className='w-full flex max-w-2xl max-lg:w-full  items-center justify-center gap-4'>
      <div className='w-full relative '>
        <Input
          type='search'
          name='name'
          placeholder='Search for a dist...'
          className='pl-12'
          onChange={(e) => setValue(e.target.value)}
          defaultValue={searchParams.get(query)?.toString()}
        />
        <Search
          color='oklch(0.7357 0.1641 34.7091)'
          className='absolute left-[24px] top-1/2 transform -translate-y-1/2 '
        />
      </div>
      <Button
        className='cursor-pointer'
        onClick={() => handleSearch(value)}
      >
        Search
      </Button>
    </div>
  )
}

export default FormSearchDist
