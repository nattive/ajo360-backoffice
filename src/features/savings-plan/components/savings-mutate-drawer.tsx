import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { useCreateSavings, useUpdateSavings } from '@/hooks/api-hooks/useSaving'
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { SavingsPlan } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: SavingsPlan | null
}

// Form schema including nested config
const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  color: z.string().min(1, 'Color is required'),
  bgColor: z.string().min(1, 'Background color is required'),
  description: z.string().optional(),
  is_visible: z.boolean(),
  is_enabled: z.boolean(),
  config: z.object({
    interest_rate: z.coerce.number().min(0, 'Interest rate must be positive'),
    minimum_days: z.coerce.number().int().min(1),
    maximum_days: z.coerce.number().int().min(1),
    allow_break: z.boolean(),
    break_penalty: z.coerce.number().min(0),
    allow_interest_withdrawal: z.boolean(),
  }),
})

type SavingsForm = z.infer<typeof formSchema>

export function SavingsMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow
  const { mutate: createSavings, isPending: isCreatLoading } =
    useCreateSavings()
  const { mutate: updateSavingsMutation, isPending: isUpdateLoading } =
    useUpdateSavings()

  const form = useForm<SavingsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          ...currentRow,
          config: {
            interest_rate: Number(currentRow.config?.interest_rate ?? 0),
            minimum_days: currentRow.config?.minimum_days ?? 30,
            maximum_days: currentRow.config?.maximum_days ?? 365,
            allow_break: currentRow.config?.allow_break ?? false,
            break_penalty: Number(currentRow.config?.break_penalty ?? 0),
            allow_interest_withdrawal:
              currentRow.config?.allow_interest_withdrawal ?? false,
          },
        }
      : {
          name: '',
          slug: '',
          color: '',
          bgColor: '',
          description: '',
          is_visible: true,
          is_enabled: true,
          config: {
            interest_rate: 0,
            minimum_days: 30,
            maximum_days: 365,
            allow_break: false,
            break_penalty: 0,
            allow_interest_withdrawal: false,
          },
        },
  })

  const onSubmit = (data: SavingsForm) => {
    if (isUpdate && currentRow && 'id' in currentRow) {
      const { config, ...rest } = data // Remove 'config' for patch
      updateSavingsMutation(
        { id: currentRow.id, formData: rest },
        {
          onSuccess: () => {
            onOpenChange(false)
            form.reset()
            showSubmittedData(data)
          },
        }
      )
    } else {
      createSavings(data, {
        onSuccess: () => {
          onOpenChange(false)
          form.reset()
          showSubmittedData(data)
        },
      })
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Savings Plan</SheetTitle>
          <SheetDescription>
            Fill in the savings details including the interest configuration.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id='savings-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-5 px-4'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. School Loan' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='slug'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. school-loan' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder='Optional plan description' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='color'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text Color</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='bgColor'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='is_visible'
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between'>
                    <FormLabel>Visible</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='is_enabled'
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between'>
                    <FormLabel>Enabled</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Config Fields */}
            <div className='mt-4 border-t pt-4'>
              <h4 className='mb-2 text-sm font-medium'>
                Interest Configuration
              </h4>

              <FormField
                control={form.control}
                name='config.interest_rate'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interest Rate (%)</FormLabel>
                    <FormControl>
                      <Input type='number' step='0.01' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='config.minimum_days'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Days</FormLabel>
                      <FormControl>
                        <Input type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='config.maximum_days'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Days</FormLabel>
                      <FormControl>
                        <Input type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='config.break_penalty'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Break Penalty (%)</FormLabel>
                    <FormControl>
                      <Input type='number' step='0.01' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='mt-2 grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='config.allow_break'
                  render={({ field }) => (
                    <FormItem className='flex items-center justify-between'>
                      <FormLabel>Allow Break</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='config.allow_interest_withdrawal'
                  render={({ field }) => (
                    <FormItem className='flex items-center justify-between'>
                      <FormLabel>Allow Interest Withdrawal</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>

        <SheetFooter className='gap-2 px-4'>
          <SheetClose asChild>
            <Button variant='outline'>Cancel</Button>
          </SheetClose>
          <Button form='savings-form' type='submit'>
            {isCreatLoading || isUpdateLoading ? (
              <Loader2 className='animate-spin' />
            ) : (
              'Save Changes'
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
