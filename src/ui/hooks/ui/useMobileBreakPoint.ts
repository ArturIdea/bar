"use client"
import {useMediaQuery} from "@mantine/hooks";

export const useMobileBreakpoint = (target = 600) => {
  return useMediaQuery(`(max-width:${target}px)`);
}