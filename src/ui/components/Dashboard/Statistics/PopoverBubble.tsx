import React, { ReactNode } from 'react';
import Image from 'next/image';

interface PopoverBubbleProps {
  children: ReactNode;
  className?: string;
}

export function PopoverBubble({ children, className = '' }: PopoverBubbleProps) {
  return (
    <div
      className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[112px] rounded-xl shadow-lg pointer-events-none opacity-0 transition-opacity group-hover:opacity-100 group-hover:pointer-events-auto ${className}`}
    >
      {/*  svg background */}
      <Image
        src="/images/icons/dashboard/statistics/popover.svg"
        alt="popover"
        className="block"
        width={112}
        height={72}
      />

      {/* text over svg */}
      <div
        className="
          absolute top-0 left-0 w-full h-full
          flex flex-col gap-2 justify-center
          text-xs text-gray-900
          px-2
          pointer-events-none
        "
      >
        {children}
      </div>
    </div>
  );
}
