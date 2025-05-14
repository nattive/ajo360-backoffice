import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  RegisterFormSchema,
  RegisterFormSchemaBase,
} from '@/schemas/authSchemas'
import { cn } from '@/lib/utils'
import { useRegister } from '@/hooks/api-hooks/useAuth'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/ui/select'
import { PasswordInput } from '@/components/password-input'

// Step-wise schemas
const Step1Schema = RegisterFormSchemaBase.pick({
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
})
const Step2Schema = RegisterFormSchemaBase.pick({
  dateOfBirth: true,
  gender: true,
  address: true,
  state: true,
  country: true,
})
const Step3Schema = RegisterFormSchemaBase.pick({
  password: true,
  confirmPassword: true,
  pin: true,
  txnPin: true,
})

export function SignUpForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useLocalStorage('signUpForm', {})
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: _registerUserMutation, isLoading: registrationLoading } =
    useRegister()

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: formData,
    mode: 'onTouched',
  })

  // Persist form data
  useEffect(() => {
    const subscription = form.watch(() => {
      setFormData(form.getValues())
    })
    return () => subscription.unsubscribe()
  }, [form.watch, setFormData])

  function handleStepSubmit() {
    const values = form.getValues()

    try {
      if (step === 1) {
        Step1Schema.parse(values)
        setStep(2)
      } else if (step === 2) {
        Step2Schema.parse(values)
        setStep(3)
      } else if (step === 3) {
        Step3Schema.parse(values)
        setIsLoading(true)

        // const { confirmPassword, _dataToSend } = values

        // console.log(dataToSend);

        // const phoneNumberPattern = /^\+(\d{1,3})\d{4,}$/
        // if (!phoneNumberPattern.test(values.phoneNumber)) {
        //   form.setError('phoneNumber', {
        //     message:
        //       'Please provide a valid international phone number starting with +',
        //   })
        //   setIsLoading(false)
        //   return
        // }
        //

        // Validate password format (at least 1 uppercase, 1 lowercase, 1 number or special char)
        const passwordPattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
        if (!passwordPattern.test(values.password)) {
          form.setError('password', {
            message:
              'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
          })
          setIsLoading(false)
          return
        }

        // try {
        //   registerUserMutation(dataToSend, {
        //     onSuccess: (res) => {
        //       setTimeout(() => {
        //         setIsLoading(false)
        //         localStorage.removeItem('signUpForm')
        //         window.location.href = '/sign-in'
        //       }, 3000)
        //     },
        //     onError: (error) => {
        //       setIsLoading(false)
        //     },
        //   })
        // } catch () {
        //   setIsLoading(false)
        // }
      }
    } catch (_e: unknown) {
      form.trigger()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleStepSubmit()
        }}
        className={cn('grid gap-3')}
      >
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder='John' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder='+1234567890' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name='dateOfBirth'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select Gender' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Male'>Male</SelectItem>
                        <SelectItem value='Female'>Female</SelectItem>
                        <SelectItem value='Other'>Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder='123 Main St' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='state'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder='State' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder='Country' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {step === 3 && (
          <>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='pin'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PIN</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='****' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='txnPin'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction PIN</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='****' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className='mt-4 flex justify-between'>
          {step > 1 && (
            <Button type='button' onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          )}
          <Button
            type='submit'
            disabled={isLoading || registrationLoading}
            className='bg-blue-800 hover:bg-blue-900'
          >
            {isLoading || registrationLoading
              ? 'Loading...'
              : step === 3
                ? 'Submit'
                : 'Next'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
