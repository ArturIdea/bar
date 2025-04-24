export const dotClasses = [
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-400',
  'bg-orange-500',
  'bg-red-500',
  'bg-indigo-500',
  'bg-pink-500',
  'bg-teal-500',
  'bg-purple-500',
  'bg-gray-500',
] as const;

export function assignDotColors<T>(items: T[]): string[] {
  return items.map((_, i) => dotClasses[i % dotClasses.length]);
}
