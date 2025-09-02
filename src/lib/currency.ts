/**
 * Utility functions for currency formatting
 */

/**
 * Formats a number as Nigerian Naira currency
 * @param amount - The amount to format
 * @param options - Additional formatting options
 * @returns Formatted currency string with ₦ symbol
 */
export function formatCurrency(
  amount: number | string,
  options: {
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    showSymbol?: boolean
  } = {}
): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    showSymbol = true,
  } = options

  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  
  if (isNaN(numericAmount)) {
    return showSymbol ? '₦0.00' : '0.00'
  }

  const formatted = numericAmount.toLocaleString('en-NG', {
    minimumFractionDigits,
    maximumFractionDigits,
  })

  return showSymbol ? `₦${formatted}` : formatted
}

/**
 * Formats currency for display in tables (shorter format)
 * @param amount - The amount to format
 * @returns Formatted currency string with ₦ symbol
 */
export function formatCurrencyCompact(amount: number | string): string {
  return formatCurrency(amount, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

/**
 * Formats currency with sign prefix for transactions
 * @param amount - The amount to format
 * @param type - Transaction type ('credit' or 'debit')
 * @returns Formatted currency string with sign and ₦ symbol
 */
export function formatTransactionAmount(
  amount: number | string,
  type: 'credit' | 'debit'
): string {
  const formatted = formatCurrency(Math.abs(Number(amount)))
  const sign = type === 'credit' ? '+' : '-'
  return `${sign}${formatted}`
}