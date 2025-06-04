/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { useSavings } from '../context/savings-context'
import { useAuth } from '@/stores/authStore'

type SavingsConfig = {
  interest_rate: string
  minimum_days: number
  maximum_days: number
  interest_style: string
  allow_break: boolean
  minimum_percentage_amount: number
  user_can_auto_save: boolean
  break_penalty: string
  allow_interest_withdrawal: boolean
  use_main_wallet_balance: boolean
  is_group_savings: boolean
  keep_interest_on_break: boolean
  keep_interest_record: boolean
}

export function UpdateConfigModal() {
  const { open, setOpen, currentRow } = useSavings()
  const [loading, setLoading] = useState(true)
  const [configData, setConfigData] = useState<SavingsConfig | null>(null)

  const { accessToken } = useAuth()

  const { control, handleSubmit, reset } = useForm<SavingsConfig>({
    defaultValues: {
      interest_rate: '',
      minimum_days: 0,
      maximum_days: 0,
      interest_style: '',
      allow_break: false,
      minimum_percentage_amount: 0,
      user_can_auto_save: false,
      break_penalty: '',
      allow_interest_withdrawal: false,
      use_main_wallet_balance: false,
      is_group_savings: false,
      keep_interest_on_break: false,
      keep_interest_record: false,
    },
  })

  useEffect(() => {
    if (open === 'updateConfig' && currentRow?.config_id) {
      const fetchConfig = async () => {
        try {
          setLoading(true)
          const res = await axios.get<SavingsConfig>(
            `https://api.myajo360.com/savings-plan/configs/${currentRow.config_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          setConfigData(res.data)
          reset(res.data)
        } catch (error) {
          console.error('Error fetching config:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchConfig()
    }
  }, [open, currentRow?.config_id, reset, accessToken])

  const onSubmit = async (data: SavingsConfig) => {
    try {
      setLoading(true)

      // Parse interest_rate and break_penalty as numbers
      const interest_rate = parseFloat(data.interest_rate)
      const break_penalty = parseFloat(data.break_penalty)

      // Validate numeric fields
      if (isNaN(interest_rate) || interest_rate < 0 || interest_rate > 100) {
        alert('Interest rate must be a number between 0 and 100.')
        setLoading(false)
        return
      }
      if (isNaN(break_penalty) || break_penalty < 0) {
        alert('Break penalty must be a non-negative number.')
        setLoading(false)
        return
      }

      // Prepare payload excluding forbidden properties
      const payload = {
        interest_rate,
        minimum_days: data.minimum_days,
        maximum_days: data.maximum_days,
        interest_style: data.interest_style,
        allow_break: data.allow_break,
        break_penalty,
        allow_interest_withdrawal: data.allow_interest_withdrawal,
        use_main_wallet_balance: data.use_main_wallet_balance,
        keep_interest_on_break: data.keep_interest_on_break,
        keep_interest_record: data.keep_interest_record,
      }

      await axios.patch(
        `https://api.myajo360.com/savings-plan/configs/${currentRow?.config_id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      setOpen(null)
    } catch (error) {
      console.error('Failed to update config:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open === 'updateConfig'}
      onOpenChange={(isOpen) => {
        if (!isOpen) setOpen(null)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Configuration</DialogTitle>
        </DialogHeader>

        {loading || !configData ? (
          <div className='space-y-4'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
            <Skeleton className='h-10 w-1/3' />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 pt-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label>Interest Rate</Label>
                <Controller
                  name='interest_rate'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder='e.g., 8.00'
                      disabled={loading}
                    />
                  )}
                />
              </div>
              <div>
                <Label>Break Penalty</Label>
                <Controller
                  name='break_penalty'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder='e.g., 1.00'
                      disabled={loading}
                    />
                  )}
                />
              </div>
              <div>
                <Label>Min Days</Label>
                <Controller
                  name='minimum_days'
                  control={control}
                  render={({ field }) => (
                    <Input
                      type='number'
                      {...field}
                      value={field.value ?? ''}
                      disabled={loading}
                    />
                  )}
                />
              </div>
              <div>
                <Label>Max Days</Label>
                <Controller
                  name='maximum_days'
                  control={control}
                  render={({ field }) => (
                    <Input
                      type='number'
                      {...field}
                      value={field.value ?? ''}
                      disabled={loading}
                    />
                  )}
                />
              </div>
              <div>
                <Label>Min % Amount</Label>
                <Controller
                  name='minimum_percentage_amount'
                  control={control}
                  render={({ field }) => (
                    <Input
                      type='number'
                      {...field}
                      value={field.value ?? ''}
                      disabled={loading}
                    />
                  )}
                />
              </div>
              <div>
                <Label>Interest Style</Label>
                <Controller
                  name='interest_style'
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      placeholder='e.g., simple or compound'
                      disabled={loading}
                    />
                  )}
                />
              </div>
            </div>

            <div className='space-y-2 pt-4'>
              {[
                { name: 'allow_break', label: 'Allow Break' },
                { name: 'user_can_auto_save', label: 'Auto Save' },
                { name: 'allow_interest_withdrawal', label: 'Withdraw Interest' },
                { name: 'use_main_wallet_balance', label: 'Use Wallet Balance' },
                { name: 'is_group_savings', label: 'Group Savings' },
                { name: 'keep_interest_on_break', label: 'Keep Interest on Break' },
                { name: 'keep_interest_record', label: 'Keep Interest Record' },
              ].map(({ name, label }) => (
                <div key={name} className='flex items-center justify-between'>
                  <Label>{label}</Label>
                  <Controller
                    name={name as keyof SavingsConfig}
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                        disabled={loading}
                      />
                    )}
                  />
                </div>
              ))}
            </div>

            <Button type='submit' className='mt-4 w-full' disabled={loading}>
              Save Changes
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
