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

export function formatLastLogin(dateStr: string): string {
  // Original format: "19:06:2025 12:04"
  const [datePart, timePart] = dateStr.split(" ");
  const [day, month, year] = datePart.split(":").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const date = new Date(year, month - 1, day, hour, minute);

  const formattedDate = date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedDate.replace(",", "");
}

export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}