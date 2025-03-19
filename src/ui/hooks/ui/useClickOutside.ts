import { useEffect, useRef } from 'react';

// Modified useClickOutside hook
export function useClickOutside<T extends HTMLElement>(
  callback: () => void,
  excludeRefs: React.RefObject<HTMLElement>[] = []
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the ref element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // But also check if it's within any of the excluded elements
        const isWithinExcluded = excludeRefs.some(
          (excludeRef) => excludeRef.current && excludeRef.current.contains(event.target as Node)
        );

        // Only trigger callback if not within excluded elements
        if (!isWithinExcluded) {
          callback();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, excludeRefs]);

  return ref;
}
