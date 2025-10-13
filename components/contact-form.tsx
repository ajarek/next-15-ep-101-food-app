'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, User, Check, MessageSquareText } from 'lucide-react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent default form submission

    if (validateForm()) {
      const form = e.currentTarget
      const formData = new FormData(form)

      const targetName = formData.get('name') as string
      const targetEmail = formData.get('email') as string
      const targetMessage = formData.get('message') as string

      setIsSubmitted(true)
      setName(targetName)
      setEmail(targetEmail)
      setMessage(targetMessage)

      form.reset() // Reset the form after submission
    } else {
      console.error('Form validation failed')
    }
  }
  const handleReset = () => {
    setName('')
    setEmail('')
    setMessage('')
    setErrors({})
    setIsSubmitted(false)
  }
  return (
    <div className='w-full flex items-center justify-center p-4 '>
      <div className='w-full max-w-md  p-8 rounded-lg shadow-lg'>
        <h1 className={` text-2xl font-bold mb-6 flex items-center`}>
          <Mail className='mr-2 h-6 w-6' /> Contact
        </h1>
        {isSubmitted ? (
          <div
            className={` flex flex-col items-center justify-center space-y-4`}
          >
            <Check className='h-12 w-12 text-green-500' />
            <p className='text-lg text-center font-semibold capitalize'>
              {name} Thank you for your message!
            </p>
            <Button
              onClick={handleReset}
              className='mt-4 hover:bg-primary hover:scale-110 transition-all duration-1000 ease-in-out'
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className='space-y-4'
          >
            <div className={` space-y-2`}>
              <Label
                htmlFor='name'
                className='flex items-center text-xl'
              >
                <User className='mr-2 h-4 w-4' /> Name
              </Label>
              <Input
                id='name'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={` ${errors.name ? 'border-red-500 ' : ''}`}
              />
              {errors.name && (
                <p className='text-sm text-red-500 mt-1'>{errors.name}</p>
              )}
            </div>
            <div className={` space-y-2`}>
              <Label
                htmlFor='email'
                className='flex items-center text-xl'
              >
                <Mail className='mr-2 h-4 w-4' /> Email
              </Label>
              <Input
                id='email'
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={` ${errors.name ? 'border-red-500 ' : ''}`}
              />
              {errors.email && (
                <p className='text-sm text-red-500 mt-1'>{errors.email}</p>
              )}
            </div>
            <div className={` space-y-2`}>
              <Label
                htmlFor='message'
                className='flex items-center text-xl'
              >
                <MessageSquareText className='mr-2 h-4 w-4' />
                Message
              </Label>
              <Textarea
                id='message'
                value={message}
                name='message'
                onChange={(e) => setMessage(e.target.value)}
                className={` ${errors.name ? 'border-red-500 ' : ''}`}
                autoFocus
              />
              {errors.message && (
                <p className='text-sm text-red-500 mt-1'>{errors.message}</p>
              )}
            </div>
            <div className='flex justify-end'>
              <Button
                type='submit'
                className='w-full cursor-pointer'
              >
                📩 Send
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
