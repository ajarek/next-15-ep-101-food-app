import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Clock, Utensils, Leaf } from 'lucide-react'
import { ReactNode } from 'react'

const Features = () => {
  return (
    <section className='w-full py-4 md:py-8'>
      <div className='@container mx-auto max-w-7xl px-6'>
        <div className='text-center'>
          <h2 className='text-balance text-xl font-semibold lg:text-2xl'>
            Our services
          </h2>
          <p>We provide our services reliably and on time</p>
        </div>
        <div className='@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-12 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-16 dark:[--color-muted:var(--color-zinc-900)]'>
          <Card className='group border-0 shadow-none'>
            <CardHeader className='pb-3'>
              <CardDecorator>
                <Clock
                  className='size-6'
                  aria-hidden
                />
              </CardDecorator>

              <h3 className='mt-6 text-2xl font-bold'>Open Daily</h3>
            </CardHeader>

            <CardContent>
              <p className='text-lg'>Monday-Sunday: 11am - 10pm</p>
            </CardContent>
          </Card>

          <Card className='group border-0 shadow-none'>
            <CardHeader className='pb-3'>
              <CardDecorator>
                <Utensils
                  className='size-6'
                  aria-hidden
                />
              </CardDecorator>

              <h3 className='mt-6 text-2xl font-bold'>Diverse Menu</h3>
            </CardHeader>

            <CardContent>
              <p className='mt-3 text-lg'>50+ dishes crafted by master chefs</p>
            </CardContent>
          </Card>

          <Card className='group border-0 shadow-none'>
            <CardHeader className='pb-3'>
              <CardDecorator>
                <Leaf
                  className='size-6'
                  aria-hidden
                />
              </CardDecorator>

              <h3 className='mt-6 text-2xl font-bold'>Fresh Ingredients</h3>
            </CardHeader>

            <CardContent>
              <p className='mt-3 text-lg'>Locally-sourced, organic produce</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className='mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]'>
    <div
      aria-hidden
      className='absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50'
    />

    <div className='bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t'>
      {children}
    </div>
  </div>
)

export default Features
