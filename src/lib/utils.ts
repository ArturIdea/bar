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

export function formatLastLogin(dateStr: string | null | undefined): string {
  // Check if dateStr is null, undefined, or empty
  if (!dateStr || typeof dateStr !== 'string') {
    return 'N/A';
  }

  // Original format: "19:06:2025 12:04"
  const [datePart, timePart] = dateStr.split(" ");
  
  // Check if we have both date and time parts
  if (!datePart || !timePart) {
    return 'N/A';
  }
  
  const [day, month, year] = datePart.split(":").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  // Validate that we have all required parts
  if (!day || !month || !year || hour === undefined || minute === undefined) {
    return 'N/A';
  }

  const date = new Date(year, month - 1, day, hour, minute);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'N/A';
  }

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