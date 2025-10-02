import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <main className='w-full overflow-hidden min-h-[400px] lg:min-h-[500px]  relative rounded-xl '>
      <div
        aria-hidden
        className='absolute inset-0 isolate hidden opacity-65 contain-strict lg:block '
      >
        <div className='w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]' />
        <div className='h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]' />
        <div className='h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]' />
      </div>
      <section>
        <div className='relative p-4  '>
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    delayChildren: 1,
                  },
                },
              },
              item: {
                hidden: {
                  opacity: 0,
                  y: 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    bounce: 0.3,
                    duration: 2,
                  },
                },
              },
            }}
            className='absolute inset-0 -z-20'
          >
            {/* No children needed here, so just an empty fragment */}
            <></>
          </AnimatedGroup>
          <div className='absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)] '></div>
          <div className='mx-auto max-w-7xl px-6  min-h-[400px] lg:min-h-[500px] flex flex-col items-center justify-center '>
            <div className='text-center sm:mx-auto lg:mr-auto lg:mt-0'>
              <TextEffect
                preset='fade-in-blur'
                speedSegment={0.3}
                as='h1'
                className=' font-bold text-balance text-3xl md:text-4xl  text-white '
              >
                Authentic Flavors Exceptional Dining
              </TextEffect>
              <TextEffect
                per='line'
                preset='fade-in-blur'
                speedSegment={0.3}
                delay={0.5}
                as='p'
                className='mx-auto mt-8 max-w-[550px] font-bold text-xl text-primary text-shadow-2xl '
              >
                Experience the finest culinary creations made with
                locally-sourced ingredients and passion.
              </TextEffect>

              <AnimatedGroup
                variants={{
                  container: {
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05,
                      },
                    },
                  },
                  item: {
                    hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 1.2,
                        type: 'spring',
                        bounce: 0.3,
                      },
                    },
                  },
                }}
                className='mt-12 flex flex-col items-center justify-center gap-2 md:flex-row'
              >
                <div
                  key={1}
                  className='bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)]  p-0.5 space-x-4'
                >
                  <Button
                    asChild
                    size='lg'
                    className='rounded-xl px-5 text-base bg-accent text-accent-foreground hover:bg-accent/90 '
                  >
                    <Link href='/menu'>
                      <span className='text-nowrap space-x-2 flex items-center'>
                        View Menu
                        <ChevronRight />
                      </span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size='lg'
                    className='rounded-xl px-5 text-base '
                  >
                    <Link href='/menu'>
                      <span className='text-nowrap'>Make Reservation</span>
                    </Link>
                  </Button>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </div>
      </section>
      <div className='absolute inset-0 -z-10 size-full '>
        <Image
          src='/hero-bg.jpg'
          alt='hero'
          fill
           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className='object-cover object-center  brightness-75 '
        />
      </div>
      <div className='absolute inset-0 -z-10 size-full '>
        <div className='absolute inset-0 bg-black/50 '></div>
      </div>
    </main>
  )
}
export default HeroSection
