'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import type { Testimonial } from '@/types/type-testimonial'
import { motion } from 'motion/react'

const testimonials: Testimonial[] = [
  {
    name: 'Jonathan Yombo',
    city: 'London',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    quote:
      'Gourmet is truly unique and very practical. There’s no long wait. What I ordered was delicious.',
  },
  {
    name: 'Yves Kalume',
    city: 'Paris',
    image: 'https://randomuser.me/api/portraits/men/6.jpg',
    quote:
      'The variety is incredible! I never get bored because every week there’s something new to try.👍',
  },
  {
    name: 'Yucel Faruksahan',
    city: 'Istanbul',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
    quote:
      'Healthy, tasty, and delivered right on time. This service saved me so much cooking stress.',
  },
  {
    name: 'Anonymous author',
    city: 'Berlin',
    image: 'https://randomuser.me/api/portraits/men/8.jpg',
    quote:
      'I love that I can choose between vegetarian, vegan, and meat dishes. Something for everyone in the family',
  },
  {
    name: 'Shekinah Tshiokufila',
    city: 'Roma',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    quote:
      'Portions are generous and always fresh. Definitely worth the subscription.',
  },
  {
    name: 'Oketa Fred',
    city: 'New York',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    quote:
      'I used to spend hours meal-planning. Now I just pick my meals online and enjoy great food every evening.',
  },
  {
    name: 'Zeki',
    city: 'San Francisco',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
    quote:
      'Restaurant quality taste at home. Honestly better than some takeout places.',
  },
  {
    name: 'Joseph Kitheka',
    city: 'Nairobi',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
    quote:
      'The delivery is super reliable, and the meals are packed perfectly. Nothing ever arrives soggy',
  },
  {
    name: 'Khatab Wedaa',
    city: 'Cairo',
    image: 'https://randomuser.me/api/portraits/men/10.jpg',
    quote:
      'I started for convenience, but stayed because the flavors are amazing. Highly recommended!.',
  },
  {
    name: 'Rodrigo Aguilar',
    city: 'Madrid',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
    quote:
      'I love Gourmet ❤️. Finally a service that caters to picky eaters and food allergies. They really think of everything.',
  },
  {
    name: 'Eric Ampire',
    city: 'Kampala',
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
    quote: 'Fresh, affordable, and easy. The best decision I made this year',
  },
  {
    name: 'Roland Tubonge',
    city: 'Brussels',
    image: 'https://randomuser.me/api/portraits/men/13.jpg',
    quote:
      'Every meal feels like a little surprise. It’s exciting to look forward to dinner again',
  },
]

const chunkArray = (
  array: Testimonial[],
  chunkSize: number
): Testimonial[][] => {
  const result: Testimonial[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize))
  }
  return result
}

const testimonialChunks = chunkArray(
  testimonials,
  Math.ceil(testimonials.length / 3)
)

const Testimonial = () => {
  return (
    <section>
      <div className='py-16 md:py-4'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='text-center'>
            <h2 className='text-2xl font-semibold'>Loved by the Customers</h2>
            <p className='mt-6'>
              Gourmet is truly unique and very practical; you don&apos;t have to
              wait long. What I ordered was delicious.
            </p>
          </div>
          <div className='mt-8 grid gap-3 [--color-card:var(--color-muted)] sm:grid-cols-2 md:mt-12 lg:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]'>
            {testimonialChunks.map((chunk, chunkIndex) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: chunkIndex * 0.1,
                  ease: 'easeOut',
                }}
                key={chunkIndex}
                className='space-y-3 *:border-none *:shadow-none'
              >
                {chunk.map(({ name, city, quote, image }, index) => (
                  <Card key={index}>
                    <CardContent className='grid grid-cols-[auto_1fr] gap-4 pt-6'>
                      <Avatar className='size-9'>
                        <AvatarImage
                          alt={name}
                          src={image}
                          loading='lazy'
                          width='120'
                          height='120'
                        />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className='font-medium'>{name}</h3>

                        <span className='text-muted-foreground block text-sm tracking-wide'>
                          {city}
                        </span>

                        <blockquote className='mt-3'>
                          <p className='text-gray-700 dark:text-gray-300'>
                            {quote}
                          </p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Testimonial
