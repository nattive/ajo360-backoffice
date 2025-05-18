import { z } from 'zod'

export const savingsPlanConfigSchema = z.object({
  id: z.string(),
  interest_rate: z.string(), // e.g., "10.00"
  minimum_days: z.number(),
  maximum_days: z.number(),
  interest_style: z.enum(['simple', 'compound']),
  allow_break: z.boolean(),
  minimum_percentage_amount: z.number(),
  user_can_auto_save: z.boolean(),
  break_penalty: z.string(),
  allow_interest_withdrawal: z.boolean(),
  use_main_wallet_balance: z.boolean(),
  is_group_savings: z.boolean(),
  keep_interest_on_break: z.boolean(),
  keep_interest_record: z.boolean(),
})

export const savingsPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  icon: z.string().nullable(),
  color: z.string(),
  bgColor: z.string(),
  description: z.string(),
  is_visible: z.boolean(),
  is_enabled: z.boolean(),
  config_id: z.string(),
  config: savingsPlanConfigSchema,
})

export type SavingsPlan = z.infer<typeof savingsPlanSchema>
