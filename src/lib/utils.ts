import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatChannelName = (channel: string): string => {
  if (!channel) {
    return 'NO DATA';
  }
  
  // Split by underscore and capitalize each word
  return channel
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
    .toUpperCase();
};