'use client'
import {Flex, Image, Text} from "@mantine/core";
import {useMobileBreakpoint} from "@/ui/hooks/ui/useMobileBreakPoint";

const BottomSection = () => {
  const isMobile = useMobileBreakpoint(600)
  return (
    <Flex w="100%" justify={isMobile ? "center" : 'space-between'}>
      <Flex direction={isMobile ? "column" : 'row'} columnGap={4} align="center">
        <Text size="sm" c='dimmed'>SIGNATURE</Text>
        <Text size="sm">B75800816377ACAFE476BF4A7A4ABCF9D552D433</Text>
      </Flex>
      {!isMobile && <Flex h={30} w={120}>
        <Image
          src="/baraka_logo.svg"
          width={120}
          height={30}
          fit="cover"
        />
      </Flex>}
    </Flex>
  )
}
export default BottomSection