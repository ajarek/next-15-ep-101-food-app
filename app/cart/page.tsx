'use client'

import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeItemFromCart, increment, decrement, removeAllFromCart, total } = useCartStore()

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Your Cart</h1>
      {items.length === 0 ? (
        
          <Card className="p-4 flex flex-col items-center justify-center space-y-2">
           <h1 className='text-destructive text-xl'>Your cart is empty.</h1>
           <Button asChild className="w-fit">
            <Link href="/menu">Go to Menu</Link>
            </Button>
            </Card>
       
      ) : (
        <div className="space-y-4">
          <Button variant="destructive" className="mb-4" onClick={removeAllFromCart}>
            Remove all
          </Button>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead>
                <tr className="bg-muted">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left">Quantity</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="border-b"
                    >
                      <td className="p-2 font-semibold">{item.name}</td>
                      <td className="p-2">${item.price}</td>
                      <td className="p-2">{item.quantity ?? 1}</td>
                      <td className="p-2 flex gap-2">
                        <Button size="sm" onClick={() => decrement(item.id)}>-</Button>
                        <Button size="sm" onClick={() => increment(item.id)}>+</Button>
                        <Button variant="destructive" size="sm" onClick={() => removeItemFromCart(item.id)}>
                          Remove
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="text-right mt-4 text-lg font-bold">
            Total: ${total()} 
          </div>
        </div>
      )}
      <Button asChild className="mt-6 w-full">
        <Link href="/checkout">Proceed to Checkout</Link>
      </Button>
    </div>
  )
}
