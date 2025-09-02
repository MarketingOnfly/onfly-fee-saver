import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Parse Brazilian number format (1.000.000,50 -> 1000000.50)
export function parseBrazilianNumber(value: string): number {
  if (!value || typeof value !== 'string') return 0;
  
  // Remove all spaces
  let cleanValue = value.replace(/\s/g, '');
  
  // If empty after cleaning, return 0
  if (!cleanValue) return 0;
  
  // Handle different formats:
  // 1.000.000,50 (Brazilian format with comma for decimals)
  // 1.000.000 (Brazilian format without decimals)
  // 1000000 (Plain number)
  // 1000000.50 (US format)
  
  // Check if it's in Brazilian format (contains dots and possibly comma)
  const hasDots = cleanValue.includes('.');
  const hasComma = cleanValue.includes(',');
  
  if (hasDots && hasComma) {
    // Brazilian format: 1.000.000,50
    // Replace dots with nothing and comma with dot
    cleanValue = cleanValue.replace(/\./g, '').replace(',', '.');
  } else if (hasDots && !hasComma) {
    // Could be either 1.000.000 (Brazilian) or 1000.50 (US)
    const dotIndex = cleanValue.lastIndexOf('.');
    const afterDot = cleanValue.substring(dotIndex + 1);
    
    // If more than 3 digits after last dot, it's likely thousands separator
    // If 1-2 digits, it's likely decimal separator
    if (afterDot.length > 2) {
      // Treat as thousands separator: 1.000.000
      cleanValue = cleanValue.replace(/\./g, '');
    }
    // Otherwise keep as decimal separator
  } else if (hasComma && !hasDots) {
    // Only comma: 1000000,50 -> 1000000.50
    cleanValue = cleanValue.replace(',', '.');
  }
  
  const parsed = parseFloat(cleanValue);
  return isNaN(parsed) ? 0 : parsed;
}

// Format number for display in Brazilian format
export function formatBrazilianNumber(value: number, showDecimals: boolean = false): string {
  if (isNaN(value) || value === 0) return '';
  
  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0
  });
  
  return formatter.format(value);
}
