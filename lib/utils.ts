
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function calculateAverageRating(categories: any[]): number {
  if (!categories || categories.length === 0) return 0;
  const sum = categories.reduce((acc, cat) => acc + cat.rating, 0);
  return Math.round((sum / categories.length) * 10) / 10;
}