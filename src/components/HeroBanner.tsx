import Container from '@/components/Container'
import { ReactNode } from 'react'

export default function HeroBanner({ children, subtitle, title }:{children:ReactNode, subtitle:string, title:string}) {
  return (
    <section className="bg-white text-center">
      <Container classNames="py-8 lg:py-12">
        <div className="flex flex-col space-y-4 space-y-reverse">
          <h1 className="order-last text-lg text-gray-700">{subtitle}</h1>

          <h2 className="text-5xl font-bold text-gray-900 sm:text-6xl">{title}</h2>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-pretty text-base/relaxed text-gray-700">
          {children}
        </p>
      </Container>
    </section>
  )
}