import Features from '@/components/features-2'
import HeroSection from '@/components/hero-section'
import SignatureDishes from '@/components/signature-dishes'
import Testimonial from '@/components/testimonials'
import React from 'react'

const Home = () => {
  return (
    <div className=' flex flex-col items-center justify-center gap-8 '>
      <HeroSection />
      <SignatureDishes />
      <Features />
      <Testimonial />
    </div>
  )
}

export default Home
