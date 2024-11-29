'use client'
import {Flex, Image, Text} from "@mantine/core";
import {useMobileBreakpoint} from "@/ui/hooks/ui/useMobileBreakPoint";

const StoreIconsMobile = () => {
  const isMobile = useMobileBreakpoint(600)

  return (
    <Flex bg={isMobile ? "white" : "transparent"} w="90%" direction="column" rowGap={16} justify="center"  p={40} style={{borderRadius: 12, border:'1px solid #ECEEF4'}}>
      <Text fw={500} size="md">DOWNLOAD THE BARAKA APP FOR MORE DETAILS</Text>
      <Flex columnGap={8} justify="space-between">
        <Flex h={40} w={139}>
          <Image
            src="/images/google_mobile.svg"
            width={139}
            height={40}
            fit="cover"
          />
        </Flex>
        <Flex h={40} w={139}>
          <Image
            src="/images/apple_mobile.svg"
            width={139}
            height={40}
            fit="cover"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}
export default StoreIconsMobile