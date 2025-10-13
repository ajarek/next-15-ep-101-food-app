'use client'
import React, { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Image from 'next/image'
import {
  CreditCard,
  Lock,
  MapPin,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  Loader2,
} from 'lucide-react'
import type { Recipe } from '@/types/type-recipe'
type PaymentData = {
  amount: number
  currency: string
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  shippingInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  items: Recipe[]
}

// Simulated payment processing
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const simulatePayment = async (paymentData: PaymentData) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate random success/failure (90% success rate)
  const isSuccess = Math.random() > 0.1

  if (!isSuccess) {
    throw new Error('Payment failed. Please try again.')
  }

  return {
    transactionId: `TXN-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 11)
      .toUpperCase()}`,
    status: 'success',
    timestamp: new Date().toISOString(),
  }
}

// Sample credit card numbers for testing
const sampleCards = [
  { type: 'Visa', number: '4532 1234 5678 9012', cvv: '123' },
  { type: 'Mastercard', number: '5555 4444 3333 2222', cvv: '456' },
  { type: 'American Express', number: '3782 822463 10005', cvv: '7890' },
]

const Checkout = () => {
  const { items, total, removeAll } = useCartStore()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
  })

  const [useSameAddress, setUseSameAddress] = useState(true)

  // Calculate totals
  const subtotal = total()
  const discount = subtotal * 0.2
  const deliveryFee = 15
  const tax = (subtotal - discount + deliveryFee) * 0.08
  const finalTotal = subtotal - discount + deliveryFee + tax

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  // Handle payment processing
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const paymentData = {
        amount: finalTotal,
        currency: 'USD',
        cardNumber: paymentInfo.cardNumber,
        expiryDate: paymentInfo.expiryDate,
        cvv: paymentInfo.cvv,
        cardholderName: paymentInfo.cardholderName,
        shippingInfo,
        items,
      }

      const result = await simulatePayment(paymentData)

      // Clear cart on successful payment
      removeAll()

      toast.success(
        `Payment successful! Transaction ID: ${result.transactionId}`
      )

      // Redirect to success page or order confirmation
      setTimeout(() => {
        router.push('/')
      }, 2000)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Payment failed')
    } finally {
      setIsProcessing(false)
    }
  }

  // Auto-fill sample card data
  const fillSampleCard = (card: (typeof sampleCards)[0]) => {
    setPaymentInfo((prev) => ({
      ...prev,
      cardNumber: card.number,
      cvv: card.cvv,
      expiryDate: '12/28',
      cardholderName: 'John Doe',
    }))
    toast.info(`Sample ${card.type} card filled`)
  }

  if (items.length === 0) {
    return (
      <div className='w-full min-h-screen flex flex-col items-center justify-center gap-4'>
        <h1 className='text-3xl font-bold text-muted-foreground'>
          Your cart is empty
        </h1>
        <Button
          onClick={() => router.push('/shop')}
          aria-label='Continue Shopping'
        >
          Continue Shopping
        </Button>
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen py-8 px-4 max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold text-center mb-4'>Secure Checkout</h1>
        <div className='flex items-center justify-center gap-2 text-muted-foreground'>
          <Shield className='w-5 h-5' />
          <span>Your payment information is encrypted and secure</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className='flex items-center justify-center mb-8'>
        <div className='flex items-center gap-4'>
          <div
            className={`flex items-center gap-2 ${
              currentStep >= 1 ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {currentStep > 1 ? <CheckCircle className='w-5 h-5' /> : '1'}
            </div>
            <span>Shipping</span>
          </div>
          <div className='w-12 h-px bg-border' />
          <div
            className={`flex items-center gap-2 ${
              currentStep >= 2 ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              {currentStep > 2 ? <CheckCircle className='w-5 h-5' /> : '2'}
            </div>
            <span>Payment</span>
          </div>
          <div className='w-12 h-px bg-border' />
          <div
            className={`flex items-center gap-2 ${
              currentStep >= 3 ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 3
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              3
            </div>
            <span>Review</span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Sample Cards Helper */}
          <Card className='border-dashed border-2 border-primary/30 bg-primary/5'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-primary'>
                <CreditCard className='w-5 h-5' />
                My Payment Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground mb-4'>
                Select the appropriate card:
              </p>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                {sampleCards.map((card, index) => (
                  <Button
                    key={index}
                    variant='outline'
                    size='sm'
                    onClick={() => fillSampleCard(card)}
                    className='text-left justify-start'
                    aria-label='Fill sample card'
                  >
                    <div>
                      <div className='font-medium'>{card.type}</div>
                      <div className='text-xs text-muted-foreground'>
                        {card.number}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <MapPin className='w-5 h-5' />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input
                      id='firstName'
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        setShippingInfo((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input
                      id='lastName'
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        setShippingInfo((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor='email'>Email</Label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                    <Input
                      id='email'
                      type='email'
                      className='pl-10'
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor='phone'>Phone Number</Label>
                  <div className='relative'>
                    <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                    <Input
                      id='phone'
                      type='tel'
                      className='pl-10'
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor='address'>Address</Label>
                  <Input
                    id='address'
                    value={shippingInfo.address}
                    onChange={(e) =>
                      setShippingInfo((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    required
                  />
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                  <div>
                    <Label htmlFor='city'>City</Label>
                    <Input
                      id='city'
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo((prev) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor='state'>State</Label>
                    <Input
                      id='state'
                      value={shippingInfo.state}
                      onChange={(e) =>
                        setShippingInfo((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor='zipCode'>ZIP Code</Label>
                    <Input
                      id='zipCode'
                      value={shippingInfo.zipCode}
                      onChange={(e) =>
                        setShippingInfo((prev) => ({
                          ...prev,
                          zipCode: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <Button
                  onClick={() => setCurrentStep(2)}
                  className='w-full'
                  disabled={
                    !shippingInfo.firstName ||
                    !shippingInfo.lastName ||
                    !shippingInfo.email ||
                    !shippingInfo.address
                  }
                  aria-label='Continue to payment'
                >
                  Continue to Payment
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                  <CreditCard className='w-5 h-5' />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div>
                  <Label htmlFor='cardNumber'>Card Number</Label>
                  <div className='relative'>
                    <CreditCard className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                    <Input
                      id='cardNumber'
                      className='pl-10'
                      placeholder='1234 5678 9012 3456'
                      value={paymentInfo.cardNumber}
                      onChange={(e) =>
                        setPaymentInfo((prev) => ({
                          ...prev,
                          cardNumber: formatCardNumber(e.target.value),
                        }))
                      }
                      maxLength={19}
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='expiryDate'>Expiry Date</Label>
                    <div className='relative'>
                      <Calendar className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                      <Input
                        id='expiryDate'
                        className='pl-10'
                        placeholder='MM/YY'
                        value={paymentInfo.expiryDate}
                        onChange={(e) =>
                          setPaymentInfo((prev) => ({
                            ...prev,
                            expiryDate: formatExpiryDate(e.target.value),
                          }))
                        }
                        maxLength={5}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor='cvv'>CVV</Label>
                    <div className='relative'>
                      <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                      <Input
                        id='cvv'
                        className='pl-10'
                        placeholder='123'
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo((prev) => ({
                            ...prev,
                            cvv: e.target.value.replace(/\D/g, ''),
                          }))
                        }
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor='cardholderName'>Cardholder Name</Label>
                  <div className='relative'>
                    <User className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                    <Input
                      id='cardholderName'
                      className='pl-10'
                      placeholder='John Doe'
                      value={paymentInfo.cardholderName}
                      onChange={(e) =>
                        setPaymentInfo((prev) => ({
                          ...prev,
                          cardholderName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    id='sameAddress'
                    checked={useSameAddress}
                    onChange={(e) => setUseSameAddress(e.target.checked)}
                    className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                  />
                  <Label
                    htmlFor='sameAddress'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Billing address same as shipping
                  </Label>
                </div>

                {!useSameAddress && (
                  <div className='space-y-4 p-4 border rounded-lg bg-muted/50'>
                    <h4 className='font-medium'>Billing Address</h4>
                    <div>
                      <Label htmlFor='billingAddress'>Address</Label>
                      <Input
                        id='billingAddress'
                        value={paymentInfo.billingAddress}
                        onChange={(e) =>
                          setPaymentInfo((prev) => ({
                            ...prev,
                            billingAddress: e.target.value,
                          }))
                        }
                        required={!useSameAddress}
                      />
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                      <div>
                        <Label htmlFor='billingCity'>City</Label>
                        <Input
                          id='billingCity'
                          value={paymentInfo.billingCity}
                          onChange={(e) =>
                            setPaymentInfo((prev) => ({
                              ...prev,
                              billingCity: e.target.value,
                            }))
                          }
                          required={!useSameAddress}
                        />
                      </div>
                      <div>
                        <Label htmlFor='billingState'>State</Label>
                        <Input
                          id='billingState'
                          value={paymentInfo.billingState}
                          onChange={(e) =>
                            setPaymentInfo((prev) => ({
                              ...prev,
                              billingState: e.target.value,
                            }))
                          }
                          required={!useSameAddress}
                        />
                      </div>
                      <div>
                        <Label htmlFor='billingZipCode'>ZIP Code</Label>
                        <Input
                          id='billingZipCode'
                          value={paymentInfo.billingZipCode}
                          onChange={(e) =>
                            setPaymentInfo((prev) => ({
                              ...prev,
                              billingZipCode: e.target.value,
                            }))
                          }
                          required={!useSameAddress}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className='flex gap-4'>
                  <Button
                    variant='outline'
                    onClick={() => setCurrentStep(1)}
                    className='flex-1'
                    aria-label='Back to shipping'
                  >
                    Back to Shipping
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    className='flex-1'
                    disabled={
                      !paymentInfo.cardNumber ||
                      !paymentInfo.expiryDate ||
                      !paymentInfo.cvv ||
                      !paymentInfo.cardholderName
                    }
                    aria-label='Review order'
                  >
                    Review Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Order Review */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                {/* Shipping Summary */}
                <div>
                  <h4 className='font-medium mb-2'>Shipping Address</h4>
                  <div className='text-sm text-muted-foreground'>
                    <p>
                      {shippingInfo.firstName} {shippingInfo.lastName}
                    </p>
                    <p>{shippingInfo.address}</p>
                    <p>
                      {shippingInfo.city}, {shippingInfo.state}{' '}
                      {shippingInfo.zipCode}
                    </p>
                    <p>{shippingInfo.email}</p>
                    <p>{shippingInfo.phone}</p>
                  </div>
                </div>

                <Separator />

                {/* Payment Summary */}
                <div>
                  <h4 className='font-medium mb-2'>Payment Method</h4>
                  <div className='text-sm text-muted-foreground'>
                    <p>**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                    <p>{paymentInfo.cardholderName}</p>
                    <p>Expires {paymentInfo.expiryDate}</p>
                  </div>
                </div>

                <Separator />

                {/* Items Summary */}
                <div>
                  <h4 className='font-medium mb-2'>Order Items</h4>
                  <div className='space-y-2'>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className='flex items-center gap-3 text-sm'
                      >
                        <Image
                          src={item.image || ''}
                          alt={item.name}
                          width={40}
                          height={40}
                          className='rounded'
                        />
                        <div className='flex-1'>
                          <p className='font-medium'>{item.name || ''}</p>
                        </div>
                        <p className='font-medium'>${total().toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className='flex gap-4'>
                  <Button
                    variant='outline'
                    onClick={() => setCurrentStep(2)}
                    className='flex-1'
                    aria-label='Back to payment'
                  >
                    Back to Payment
                  </Button>
                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className='flex-1'
                    aria-label='Complete payment'
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className='w-4 h-4 mr-2' />
                        Complete Payment
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className='lg:col-span-1'>
          <Card className='sticky top-4'>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Items */}
              <div className='space-y-3'>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className='flex items-center gap-3'
                  >
                    <div className='relative'>
                      <Image
                        src={item.image || ''}
                        alt={item.name}
                        width={60}
                        height={60}
                        className='rounded-lg'
                      />
                      <div className='absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                        {item.quantity}
                      </div>
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='font-medium text-sm truncate'>
                        {item.name}
                      </p>
                    </div>
                    <p className='font-medium text-sm'>
                      ${item.price * (item.quantity ?? 1)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Pricing Breakdown */}
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm text-green-600'>
                  <span>Discount (20%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className='flex justify-between font-bold text-lg'>
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Features */}
              <div className='bg-muted/50 p-3 rounded-lg'>
                <div className='flex items-center gap-2 text-sm text-muted-foreground mb-2'>
                  <Shield className='w-4 h-4' />
                  <span className='font-medium'>Secure Payment</span>
                </div>
                <ul className='text-xs text-muted-foreground space-y-1'>
                  <li>• SSL encrypted checkout</li>
                  <li>• PCI DSS compliant</li>
                  <li>• 30-day money back guarantee</li>
                  <li>• Free returns & exchanges</li>
                </ul>
              </div>

              {/* Estimated Delivery */}
              <div className='bg-primary/10 p-3 rounded-lg'>
                <div className='flex items-center gap-2 text-sm text-primary mb-1'>
                  <MapPin className='w-4 h-4' />
                  <span className='font-medium'>Estimated Delivery</span>
                </div>
                <p className='text-xs text-muted-foreground'>
                  {new Date(
                    Date.now() + 0 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  within 2 hours.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Checkout
